import type { Plugin } from "vite";
import fs from "node:fs";
import path from "node:path";
import { getPortfolioSystemPrompt } from "../src/lib/aiContext";

function getGroqKey(): string {
  if (process.env.GROQ_API_KEY) return process.env.GROQ_API_KEY;
  try {
    const envPath = path.resolve(process.cwd(), ".env.local");
    if (fs.existsSync(envPath)) {
      const content = fs.readFileSync(envPath, "utf-8");
      const match = content.match(/GROQ_API_KEY\s*=\s*([^\r\n#]+)/);
      if (match) return match[1].trim();
    }
  } catch {
    // Ignore error
  }
  return "";
}

export function apiChatPlugin(): Plugin {
  return {
    name: "api-chat-plugin",
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (req.url === "/api/chat" && req.method === "POST") {
          let body = "";
          req.on("data", (chunk) => {
            body += chunk;
          });

          req.on("end", async () => {
            try {
              const apiKey = getGroqKey();
              if (!apiKey) {
                res.statusCode = 503;
                res.setHeader("Content-Type", "application/json");
                res.end(JSON.stringify({ error: "GROQ_API_KEY is not configured" }));
                return;
              }

              const data = JSON.parse(body || "{}");
              const userMessages = Array.isArray(data.messages) ? data.messages : [];
              const systemPrompt = getPortfolioSystemPrompt();

              const groqRes = await fetch("https://api.groq.com/openai/v1/chat/completions", {
                method: "POST",
                headers: {
                  Authorization: `Bearer ${apiKey}`,
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  model: "qwen/qwen3.8-27b",
                  messages: [
                    { role: "system", content: systemPrompt },
                    ...userMessages.slice(-6).map((m: { role: string; content: string }) => ({
                      role: m.role === "assistant" ? "assistant" : "user",
                      content: m.content,
                    })),
                  ],
                  temperature: 0.6,
                  max_tokens: 450,
                  stream: true,
                }),
              });

              if (!groqRes.ok || !groqRes.body) {
                const errText = await groqRes.text();
                res.statusCode = groqRes.status;
                res.setHeader("Content-Type", "application/json");
                res.end(JSON.stringify({ error: errText }));
                return;
              }

              res.statusCode = 200;
              res.setHeader("Content-Type", "text/plain; charset=utf-8");
              res.setHeader("Transfer-Encoding", "chunked");

              const reader = groqRes.body.getReader();
              const decoder = new TextDecoder("utf-8");
              let buffer = "";

              while (true) {
                const { done, value } = await reader.read();
                if (done) break;
                buffer += decoder.decode(value, { stream: true });
                const lines = buffer.split("\n");
                buffer = lines.pop() || "";

                for (const line of lines) {
                  const trimmed = line.trim();
                  if (!trimmed || !trimmed.startsWith("data: ")) continue;
                  const jsonStr = trimmed.slice(6);
                  if (jsonStr === "[DONE]") continue;
                  try {
                    const parsed = JSON.parse(jsonStr);
                    const delta = parsed.choices?.[0]?.delta?.content || "";
                    if (delta) res.write(delta);
                  } catch {
                    // Ignore parsing chunk error
                  }
                }
              }

              res.end();
            } catch (err: unknown) {
              const message = err instanceof Error ? err.message : "Unknown error";
              res.statusCode = 500;
              res.setHeader("Content-Type", "application/json");
              res.end(JSON.stringify({ error: message }));
            }
          });
          return;
        }
        next();
      });
    },
  };
}
