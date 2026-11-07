import { answerQuestion } from "./sahayaKnowledge";

export interface ChatMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

export async function sendChatMessage(
  messages: ChatMessage[],
  onChunk?: (chunk: string) => void,
): Promise<string> {
  const lastUserMessage = messages[messages.length - 1]?.content || "";

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 12000); // 12s timeout

    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!res.ok) {
      throw new Error(`AI API responded with status ${res.status}`);
    }

    // Check if response is streaming
    if (res.body && onChunk) {
      const reader = res.body.getReader();
      const decoder = new TextDecoder("utf-8");
      let fullText = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        fullText += chunk;
        onChunk(fullText);
      }

      if (fullText.trim()) return fullText.trim();
    }

    // Fallback to json if non-streaming
    const data = await res.json();
    if (data?.content) return data.content;
    if (data?.error) throw new Error(data.error);

    return answerQuestion(lastUserMessage);
  } catch (err) {
    console.warn("Live AI API unavailable, using offline knowledge base fallback:", err);
    // Graceful offline fallback
    return answerQuestion(lastUserMessage);
  }
}
