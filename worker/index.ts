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
- **Headline**: Student AI/ML Engineer | M.Sc. Artificial Intelligence @ SJC | Digital Marketing Intern @ HodoLabs | 2x Hackathon Achiever
- **Current Status**: M.Sc. Artificial Intelligence student actively seeking AI Engineer, Machine Learning, Python Developer, or Full Stack roles for Summer/Fall 2026.
- **Location**: Madurai, Tamil Nadu, India. Open to remote, hybrid, and relocation opportunities.
- **Top Skills (Verified)**: PostgreSQL, Node.js, React.js
- **Languages**: Tamil (Native or Bilingual), English (Limited Working), Hindi (Elementary)
- **Contact Info**:
  * Email: contact@sahayasavari.dev
  * Mobile Phone: +91 6385648514
  * GitHub: https://github.com/sahaya-savari
  * LinkedIn: https://www.linkedin.com/in/sahaya-savari
  * Portfolio: https://sahayasavari.dev

### Work Experience:
- **Digital Marketing Intern** at **HodoLabs** (June 2026 – Present, Madurai, Tamil Nadu, India)
  * Conduct in-depth technical SEO audits, site architecture reviews, and PageSpeed optimizations across client web properties.
  * Analyze organic search visibility, metadata, crawlability, and conversion funnels to drive digital marketing growth.
  * Manage Google Business Profiles and structured analytics reporting to measure and enhance digital campaign performance.

### Hackathons & Honors (1:1 Verified Match with LinkedIn):
1. **AIxcelerate 2026 - Overall Champion** (Dhanalakshmi Srinivasan University, 66 teams) — NelSync AI (Agri-tech ML logistics).
2. **Top 5 Finalist (Out of 110 Teams) - VibeCraft 2026 Hackathon** (SRM IST Trichy YUVA'26) — Team NeuraGenZers (Dual campus web apps).
3. **BOOTFEST 2K26 - Quiz Winner & Capture The Flag Runner-up** (Bishop Heber College, PG Dept of CS).
4. **Achievers Day - Interdepartmental Contest Winner (Certificate of Merit)** (St. Joseph's College Autonomous).
5. **AION 2K26 – Event In-Charge (Treasure Titans)** (Department of AI, St. Joseph's College Autonomous).

### Verified Certifications (LinkedIn):
1. **IBM Data Analyst Specialization** (IBM / Coursera, Aug 2024, ID: DDWFE1NB25DZ)
2. **Yuva AI for All** (NIELIT / Skill India, Mar 2026, ID: 2026030427766558-105732)
3. **Introduction to Machine Learning (Tamil)** (NPTEL / IIT Madras, Mar 2026, ID: NPTEL26CS73S470101904)
4. **Web Development and Software Engineering** (HodoLabs, June 2026, ID: HODOLABS-SE-2026)

### Key Projects:
- **NelSync AI**: Overall Champion (66 teams) at AIxcelerate 2026. 4-stage AI optimization layer for paddy procurement in Tamil Nadu: predict, optimize, schedule, monitor.
- **VibeCraft 2026 (NeuraGenZers)**: Top 5 Finalist (110 teams) at YUVA'26. Dual campus web applications combining attendance projection and smart room location.
- **PrepMind AI**: Live web-based exam prep platform with topic-based MCQ practice, interactive study tools, AI tutoring, and fallback question banks.
- **Daily Spark**: Offline-first habit and streak tracking application built with React, TypeScript, and IndexedDB with Capacitor Android support.
- **Portfolio Website**: High-performance SPA with sub-second load, manual Vite chunk splitting, and WCAG AA accessibility.

### Education (LinkedIn Verified):
1. **Master of Science, AI** — St. Joseph's College (Autonomous), Tiruchirappalli (July 2025 – May 2027)
2. **Bachelor of Science, Data science** — Thiagarajar College, Madurai (August 2022 – May 2025) [65.06%]
3. **HSC, BIO-MATHS (Maths Physics Chemistry Biology)** — St. Mary's Higher Secondary School, Madurai (June 2020 – July 2022)
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
