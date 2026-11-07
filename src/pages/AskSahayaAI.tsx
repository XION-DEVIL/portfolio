import { useState, useEffect, useRef, useMemo } from "react";
import { Link } from "@/lib/router-compat";
import {
  ArrowLeft,
  Send,
  Sparkles,
  User,
  Bot,
  Terminal as TerminalIcon,
  MessageSquare,
} from "lucide-react";
import SEOHead from "../components/SEOHead";
import { SITE_URL, createBreadcrumbSchema, askSahayaAIAppSchema } from "../seo";
import Button from "../components/ui/PortfolioButton";
import { answerQuestion, SUGGESTIONS } from "../lib/sahayaKnowledge";
import { sendChatMessage, type ChatMessage } from "../lib/aiService";

type Message = {
  id: string;
  role: "user" | "ai";
  content: string;
};

function FormattedMessage({ text, isAi }: { text: string; isAi: boolean }) {
  const lines = text.split("\n");
  return (
    <div className="space-y-1.5">
      {lines.map((line, lIdx) => {
        if (!line.trim()) return <div key={lIdx} className="h-1.5" />;
        const parts = line.split(/(\*\*.*?\*\*|\[.*?\]\(.*?\))/g);
        return (
          <p key={lIdx} className="leading-relaxed">
            {parts.map((part, pIdx) => {
              if (part.startsWith("**") && part.endsWith("**")) {
                return (
                  <strong
                    key={pIdx}
                    className={isAi ? "font-bold text-black" : "font-bold text-white"}
                  >
                    {part.slice(2, -2)}
                  </strong>
                );
              }
              const linkMatch = part.match(/^\[(.*?)\]\((.*?)\)$/);
              if (linkMatch) {
                return (
                  <a
                    key={pIdx}
                    href={linkMatch[2]}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`underline font-semibold hover:opacity-80 transition-opacity ${
                      isAi ? "text-blue-800" : "text-blue-300"
                    }`}
                  >
                    {linkMatch[1]}
                  </a>
                );
              }
              return part;
            })}
          </p>
        );
      })}
    </div>
  );
}

type TerminalEntry = {
  id: string;
  command: string;
  output: string;
};

const INITIAL_MESSAGES: Message[] = [
  {
    id: "1",
    role: "ai",
    content:
      "Hi! I'm the digital assistant for Sahaya Savari F. I can answer questions about his skills, experience, projects, or how to contact him. What would you like to know?",
  },
];

const INITIAL_TERMINAL: TerminalEntry[] = [
  {
    id: "0",
    command: "welcome",
    output:
      'Sahaya Savari F — Interactive Developer CLI v2.6.0\nType "help" to view commands or tap the quick-command chips below.',
  },
];

export default function AskSahayaAI() {
  const [viewMode, setViewMode] = useState<"chat" | "terminal">("chat");
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Terminal state
  const [terminalHistory, setTerminalHistory] = useState<TerminalEntry[]>(INITIAL_TERMINAL);
  const [cliInput, setCliInput] = useState("");
  const terminalEndRef = useRef<HTMLDivElement>(null);
  const cliInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleCliCommand = (cmdText: string) => {
    const raw = cmdText.trim();
    if (!raw) return;
    const cmd = raw.toLowerCase();
    let output = "";

    switch (cmd) {
      case "help":
        output =
          "Available commands:\n  • projects   — List production & hackathon projects\n  • nelsync    — 1st Place Champion project details (AIxcelerate 2026)\n  • vibecraft  — Winner project details (VibeCraft 2026, 5th of 110)\n  • skills     — Technical competencies & ML stack\n  • experience — Work history & internships (HodoLabs)\n  • contact    — Email, GitHub, and LinkedIn links\n  • clear      — Clear the terminal screen\n  • help       — Show this command manual";
        break;
      case "projects":
        output =
          "1. NelSync AI — 1st Place Overall Champion at AIxcelerate 2026 (Agri-tech ML Logistics)\n2. VibeCraft 2026 (NeuraGenZers) — Winner, 5th of 110 Teams (Dual Campus Web Apps)\n3. PrepMind AI — Web-based Exam Prep & Topic Practice Platform (React / TypeScript)\n4. Daily Spark — Minimalist Offline-First Habit Tracker (React / TypeScript / IndexedDB / Capacitor)\n5. Portfolio Website — High-Performance SPA with sub-second TTI & WCAG AA accessibility";
        break;
      case "vibecraft":
        output =
          "🏆 VibeCraft 2026 (NeuraGenZers) — Winner, 5th of 110 Teams (SRM IST Trichy YUVA'26)\nTwo campus apps in one live Vercel deployment: Round 1 Attendance Predictor & Planner + Round 2 Free Class Locator & Smart Search Floor Manager.\nLive URL: https://neuragenzers.vercel.app/";
        break;
      case "nelsync":
        output =
          "🏆 NelSync AI (Overall Champion — AIxcelerate 2026, 66 teams)\nAn AI layer for paddy procurement in Tamil Nadu with four stages: predict, optimize, schedule, and monitor. Built by a team of 4 led by Jeeva Loganathan; contribution: first pitch deck, research, coordination, and Q&A prep.\nVideo Demo: https://drive.google.com/file/d/1rRhYHPqLeM1Q-yKeuZ8BuC9c1ds2WG5Q/view?pli=1";
        break;
      case "skills":
        output =
          "• Top Skills (Verified): PostgreSQL, Node.js, React.js\n• AI & ML: Python, Machine Learning, Scikit-Learn, Predictive Modeling, Data Analytics\n• Web & Tools: TypeScript, Next.js, Vite, Tailwind CSS, Firebase, Vercel, Git & GitHub\n• Languages: Tamil (Native/Bilingual), English (Limited Working), Hindi (Elementary)";
        break;
      case "experience":
        output =
          "• Digital Marketing Intern @ HodoLabs (June 2026 – Present · Madurai, Tamil Nadu, India)\n  SEO technical audits, site architecture, PageSpeed optimization, and marketing analytics.";
        break;
      case "contact":
        output =
          "• Primary Email: sahayasavari.info@gmail.com\n• Secondary Email: contact@sahayasavari.dev\n• Phone: +91 6385648514\n• Location: Madurai, Tamil Nadu, India\n• LinkedIn: https://www.linkedin.com/in/sahaya-savari\n• GitHub: https://github.com/sahaya-savari\n• Portfolio: https://sahayasavari.dev";
        break;
      case "clear":
        setTerminalHistory([]);
        setCliInput("");
        return;
      default:
        output = `Command not recognized: "${raw}". Type "help" to see valid commands.`;
    }

    setTerminalHistory((prev) => [...prev, { id: Date.now().toString(), command: raw, output }]);
    setCliInput("");
  };

  const aiSchema = useMemo(() => {
    const breadcrumb = createBreadcrumbSchema([
      { name: "Home", url: SITE_URL },
      { name: "Ask Sahaya AI", url: `${SITE_URL}/ai` },
    ]);
    return {
      "@context": "https://schema.org",
      "@graph": [
        breadcrumb,
        {
          "@type": "WebPage",
          "@id": `${SITE_URL}/ai/#webpage`,
          url: `${SITE_URL}/ai`,
          name: "Ask Sahaya AI | Portfolio Assistant for AI Engineering",
          description:
            "Chat with Sahaya Savari F's portfolio assistant to learn about his AI Engineer skills, Machine Learning projects, Python, React, TypeScript, and Firebase work.",
          author: { "@id": `${SITE_URL}/#person` },
        },
        askSahayaAIAppSchema,
      ],
    };
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const ask = async (text: string) => {
    if (!text.trim() || isTyping) return;
    const userMessage: Message = { id: Date.now().toString(), role: "user", content: text.trim() };
    const aiMessageId = (Date.now() + 1).toString();
    const updatedMessages = [...messages, userMessage];

    setMessages(updatedMessages);
    setInput("");
    setIsTyping(true);

    try {
      const chatPayload: ChatMessage[] = updatedMessages.map((m) => ({
        role: m.role === "ai" ? "assistant" : "user",
        content: m.content,
      }));

      // Add placeholder message for streaming response
      setMessages((prev) => [...prev, { id: aiMessageId, role: "ai", content: "" }]);

      const result = await sendChatMessage(chatPayload, (chunk) => {
        setMessages((prev) =>
          prev.map((m) => (m.id === aiMessageId ? { ...m, content: chunk } : m)),
        );
      });

      setMessages((prev) =>
        prev.map((m) => (m.id === aiMessageId ? { ...m, content: result } : m)),
      );
    } catch {
      setMessages((prev) =>
        prev.map((m) =>
          m.id === aiMessageId ? { ...m, content: answerQuestion(userMessage.content) } : m,
        ),
      );
    } finally {
      setIsTyping(false);
    }
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    ask(input);
  };

  return (
    <>
      <SEOHead
        title="Ask Sahaya AI | Portfolio Assistant for AI Engineering"
        description="Chat with Sahaya Savari F's portfolio assistant to learn about his AI Engineer skills, Machine Learning projects, Python, React, TypeScript, and Firebase work."
        url={`${SITE_URL}/ai`}
        schema={aiSchema}
      />
      <div className="pt-32 pb-24 px-6 max-w-screen-md mx-auto min-h-screen flex flex-col bg-black text-white selection:bg-white selection:text-black">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-white/50 hover:text-white mb-8 transition-colors font-body text-sm self-start"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Portfolio
        </Link>

        <header className="mb-8 border-b border-white/10 pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-heading font-bold tracking-tight">Ask Sahaya AI</h1>
              <p className="text-sm font-body text-foreground/50">Portfolio assistant · Demo</p>
            </div>
          </div>

          {/* Mode Switcher */}
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-white/5 border border-white/10 self-start sm:self-auto">
            <button
              onClick={() => setViewMode("chat")}
              className={`px-3 py-1.5 rounded-lg text-xs font-body transition-colors cursor-pointer flex items-center gap-1.5 ${
                viewMode === "chat"
                  ? "bg-white text-black font-semibold"
                  : "text-white/60 hover:text-white"
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5" /> Chat View
            </button>
            <button
              onClick={() => setViewMode("terminal")}
              className={`px-3 py-1.5 rounded-lg text-xs font-body transition-colors cursor-pointer flex items-center gap-1.5 ${
                viewMode === "terminal"
                  ? "bg-white text-black font-semibold"
                  : "text-white/60 hover:text-white"
              }`}
            >
              <TerminalIcon className="w-3.5 h-3.5" /> Developer CLI
            </button>
          </div>
        </header>

        {viewMode === "chat" ? (
          <div className="flex flex-col bg-foreground/[0.02] border border-foreground/10 rounded-lg overflow-hidden mb-8 h-[600px] max-h-[75dvh] min-h-[350px]">
            <div
              className="flex-1 min-h-0 overflow-y-auto p-3 sm:p-6 space-y-6"
              role="log"
              aria-label="Portfolio conversation"
              aria-live="polite"
              aria-busy={isTyping}
            >
              {messages.map((msg) => {
                if (!msg.content && isTyping) return null;
                return (
                  <div
                    key={msg.id}
                    className={`flex gap-4 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.role === "user" ? "bg-white/20" : "bg-white text-black"}`}
                    >
                      {msg.role === "user" ? (
                        <User className="w-4 h-4" />
                      ) : (
                        <Bot className="w-4 h-4" />
                      )}
                    </div>
                    <div
                      className={`p-4 rounded-lg min-w-0 break-words max-w-[85%] font-body text-sm leading-relaxed ${
                        msg.role === "user"
                          ? "bg-foreground/10 text-foreground rounded-tr-none"
                          : "bg-white text-black rounded-tl-none shadow-md"
                      }`}
                    >
                      <FormattedMessage text={msg.content} isAi={msg.role === "ai"} />
                    </div>
                  </div>
                );
              })}
              {isTyping &&
                (!messages[messages.length - 1]?.content ||
                  messages[messages.length - 1]?.role === "user") && (
                  <div className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center shrink-0">
                      <Bot className="w-4 h-4" />
                    </div>
                    <div className="p-4 rounded-2xl bg-white text-black rounded-tl-none font-body text-sm flex items-center gap-1.5">
                      <span
                        className="w-1.5 h-1.5 bg-black/50 rounded-full animate-bounce"
                        style={{ animationDelay: "0ms" }}
                      />
                      <span
                        className="w-1.5 h-1.5 bg-black/50 rounded-full animate-bounce"
                        style={{ animationDelay: "150ms" }}
                      />
                      <span
                        className="w-1.5 h-1.5 bg-black/50 rounded-full animate-bounce"
                        style={{ animationDelay: "300ms" }}
                      />
                    </div>
                  </div>
                )}
              <div ref={messagesEndRef} />
            </div>
            <div className="p-4 border-t border-white/10 bg-black/50">
              <div className="flex flex-wrap gap-2 mb-3" aria-label="Suggested questions">
                {SUGGESTIONS.map(([label, question]) => (
                  <Button
                    key={label}
                    variant="glass"
                    disabled={isTyping}
                    className="!px-3 !py-2 !min-h-[36px] !text-xs"
                    onClick={() => ask(question)}
                  >
                    {label}
                  </Button>
                ))}
              </div>
              <form onSubmit={handleSend} className="relative">
                <input
                  ref={inputRef}
                  type="text"
                  aria-label="Ask a question about Sahaya's skills, projects, or experience"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about my skills, projects, or experience..."
                  className="w-full bg-white/5 border border-white/10 rounded-full py-3 pl-6 pr-14 text-white placeholder-white/40 focus:outline-none focus:border-white/30 font-body text-sm transition-colors"
                />
                <Button
                  type="submit"
                  aria-label="Send message"
                  disabled={!input.trim() || isTyping}
                  className="absolute right-2 top-1/2 -translate-y-1/2 !p-0 !min-h-[36px] w-9 h-9 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </form>
            </div>
          </div>
        ) : (
          /* Developer CLI Terminal View */
          <div className="flex flex-col bg-black/90 border border-emerald-500/30 rounded-xl overflow-hidden mb-8 h-[600px] max-h-[75dvh] min-h-[350px] font-mono shadow-2xl">
            {/* Terminal Title Bar */}
            <div className="px-4 py-2.5 bg-white/5 border-b border-white/10 flex items-center justify-between text-xs text-white/60">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block"></span>
                <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block"></span>
                <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block"></span>
                <span className="ml-2 font-mono text-emerald-400">sahaya@portfolio: ~</span>
              </div>
              <span className="text-[10px] text-white/40 font-mono">bash 5.2</span>
            </div>

            {/* Terminal Body */}
            <div className="flex-1 min-h-0 overflow-y-auto p-4 space-y-4 text-xs leading-relaxed text-emerald-300">
              {terminalHistory.map((item) => (
                <div key={item.id} className="space-y-1">
                  <div className="flex items-center gap-2 text-white/80">
                    <span className="text-emerald-400 font-bold">sahaya@portfolio:~$</span>
                    <span>{item.command}</span>
                  </div>
                  <div className="pl-4 whitespace-pre-wrap text-emerald-200/90 font-mono">
                    {item.output}
                  </div>
                </div>
              ))}
              <div ref={terminalEndRef} />
            </div>

            {/* Terminal Input Bar & Quick Chips */}
            <div className="p-3 bg-black border-t border-white/10 space-y-2">
              <div className="flex flex-wrap gap-1.5" aria-label="Terminal quick commands">
                {["help", "projects", "nelsync", "skills", "experience", "contact", "clear"].map(
                  (cmd) => (
                    <button
                      key={cmd}
                      onClick={() => handleCliCommand(cmd)}
                      className="px-2.5 py-1 rounded bg-white/5 hover:bg-emerald-500/20 hover:border-emerald-500/40 border border-white/10 text-[11px] text-emerald-300 transition-colors cursor-pointer"
                    >
                      {cmd}
                    </button>
                  ),
                )}
              </div>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleCliCommand(cliInput);
                }}
                className="flex items-center gap-2"
              >
                <span className="text-emerald-400 font-bold text-xs shrink-0">
                  sahaya@portfolio:~$
                </span>
                <input
                  ref={cliInputRef}
                  type="text"
                  value={cliInput}
                  onChange={(e) => setCliInput(e.target.value)}
                  placeholder="Type a command (e.g. nelsync, projects, skills)..."
                  className="flex-grow bg-transparent border-none text-xs text-white placeholder-white/30 focus:outline-none"
                  autoFocus
                />
              </form>
            </div>
          </div>
        )}

        {/* Semantic Overview & Context */}
        <section
          aria-label="About Ask Sahaya AI"
          className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 font-body text-xs text-white/70 space-y-2"
        >
          <h2 className="text-xs font-bold uppercase tracking-wider text-white/50">
            About Ask Sahaya AI
          </h2>
          <p className="leading-relaxed text-white/80">
            Ask Sahaya AI is an interactive portfolio assistant built to answer questions regarding
            Sahaya Savari's technical background in Artificial Intelligence, Machine Learning
            models, Python development, React frontend architecture, and contact options.
          </p>
          <p className="text-white/50">
            Sample topics:{" "}
            <span className="text-white/80">"What are your core technical skills?"</span> ·{" "}
            <span className="text-white/80">"Tell me about PrepMind AI"</span> ·{" "}
            <span className="text-white/80">"How can I contact Sahaya?"</span>
          </p>
        </section>
      </div>
    </>
  );
}
