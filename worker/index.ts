/**
 * Cloudflare Worker Proxy for Sahaya Savari F Portfolio AI Assistant
 *
 * Securely proxies chat completions to Groq, keeping the API key secret.
 * Deploy with: npx wrangler deploy
 * Set secret with: npx wrangler secret put GROQ_API_KEY
 */

export interface Env {
  GROQ_API_KEY: string;
}

const SYSTEM_PROMPT = `You are the official digital AI Assistant for Sahaya Savari F, hosted on his portfolio (sahayasavari.dev).
Your goal is to inform recruiters, hiring managers, and collaborators about Sahaya's background, skills, and projects.

### Persona & Tone
- Professional, concise, welcoming, articulate, and recruiter-focused.
- Highlight technical depth (ML, Python, TypeScript, modern web).
- Format responses in clean Markdown (bold keywords, concise bullet lists).
- Keep answers focused (1 to 3 short paragraphs or bullet points).
- NEVER make up or hallucinate credentials, degrees, employers, or metrics not listed below. If asked something unknown, politely recommend emailing contact@sahayasavari.dev.

---
### Verified Facts About Sahaya Savari F:
- **Current Status**: M.Sc. Artificial Intelligence student actively seeking AI Engineer, Machine Learning, Python Developer, or Full Stack roles for Summer/Fall 2026.
- **Location**: Madurai, Tamil Nadu, India. Open to remote and hybrid opportunities.
- **Contact Info**:
  * Email: contact@sahayasavari.dev
  * GitHub: https://github.com/sahaya-savari
  * LinkedIn: https://www.linkedin.com/in/sahaya-savari
  * Portfolio: https://sahayasavari.dev

### Work Experience:
- **Web Development Intern** at **HodoLabs Technologies Pvt. Ltd.** (Jun 2026 – Present, Madurai, India)
- **Technical SEO Intern** at **HodoLabs Technologies Pvt. Ltd.** (May 2026 – Jun 2026, Madurai, India)
- **Leadership**: Lead Symposium Event Organizer — Treasure Titans · AION 2K26 (National Level Technical Symposium).

### Hackathons & Honors:
- **1st Place Overall Champion** — AIxcelerate 2026 Hackathon (St. Joseph's College) for NelSync AI.
- **1st Place Winner** — AI Code Quest (AION 2K26)
- **1st Place Winner** — BootFest '23 Code Debugging & Tech Contest

### Key Projects:
- **NelSync AI**: 1st Place Champion Agri-tech ML logistics predicting paddy grain moisture and transit spoilage risks to balance regional station queues.
- **PrepMind AI**: AI-Powered technical interview readiness platform using FastAPI, Python, and Supabase.
- **Daily Spark**: Minimalist offline-first habit tracker using React, TypeScript, and IndexedDB.
- **Portfolio Website**: High-performance SPA with sub-second TTI, WCAG AA accessibility, and SSR.

### Education:
- **M.Sc. Artificial Intelligence** — Thiagarajar College (2024–2026) [CGPA: 8.44/10]
- **B.Sc. Computer Science** — St. Joseph's College (Autonomous) (2021–2024) [CGPA: 8.65/10]
`;

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    // Handle CORS preflight
    if (request.method === "OPTIONS") {
      return new Response(null, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type",
          "Access-Control-Max-Age": "86400",
        },
      });
    }

    const url = new URL(request.url);
    if (url.pathname !== "/api/chat" && url.pathname !== "/chat") {
      return new Response("Not Found", { status: 404 });
    }

    if (request.method !== "POST") {
      return new Response("Method Not Allowed", { status: 405 });
    }

    if (!env.GROQ_API_KEY) {
      return new Response(JSON.stringify({ error: "GROQ_API_KEY not configured" }), {
        status: 503,
        headers: { "Content-Type": "application/json" },
      });
    }

    try {
      const data = (await request.json()) as { messages?: { role: string; content: string }[] };
      const userMessages = Array.isArray(data.messages) ? data.messages : [];

      const groqRes = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${env.GROQ_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "qwen/qwen3.8-27b",
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            ...userMessages.slice(-6).map((m) => ({
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
        const err = await groqRes.text();
        return new Response(JSON.stringify({ error: err }), {
          status: groqRes.status,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        });
      }

      // Transform SSE stream into clean plain text chunks for simple frontend consumption
      const { readable, writable } = new TransformStream();
      const writer = writable.getWriter();
      const reader = groqRes.body.getReader();
      const encoder = new TextEncoder();
      const decoder = new TextDecoder();

      (async () => {
        let buffer = "";
        try {
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
                if (delta) await writer.write(encoder.encode(delta));
              } catch {
                // Ignore parse errors on partial frames
              }
            }
          }
        } finally {
          await writer.close();
        }
      })();

      return new Response(readable, {
        headers: {
          "Content-Type": "text/plain; charset=utf-8",
          "Access-Control-Allow-Origin": "*",
        },
      });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Internal Error";
      return new Response(JSON.stringify({ error: message }), {
        status: 500,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });
    }
  },
};
