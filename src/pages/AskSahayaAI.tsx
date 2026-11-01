import { useState, useEffect, useRef, useMemo } from 'react';
import { Link } from '@/lib/router-compat';
import { ArrowLeft, Send, Sparkles, User, Bot } from 'lucide-react';
import SEOHead from '../components/SEOHead';
import { SITE_URL, createBreadcrumbSchema, askSahayaAIAppSchema } from '../seo';
import Button from '../components/ui/PortfolioButton';
import { answerQuestion, SUGGESTIONS } from '../lib/sahayaKnowledge';

type Message = {
  id: string;
  role: 'user' | 'ai';
  content: string;
};

const INITIAL_MESSAGES: Message[] = [
  {
    id: '1',
    role: 'ai',
    content: "Hi! I'm the digital assistant for Sahaya Savari F. I can answer questions about his skills, experience, projects, or how to contact him. What would you like to know?"
  }
];

export default function AskSahayaAI() {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const aiSchema = useMemo(() => {
    const breadcrumb = createBreadcrumbSchema([
      { name: 'Home', url: SITE_URL },
      { name: 'Ask Sahaya AI', url: `${SITE_URL}/ai` },
    ]);
    return {
      '@context': 'https://schema.org',
      '@graph': [
        breadcrumb,
        {
          '@type': 'WebPage',
          '@id': `${SITE_URL}/ai/#webpage`,
          url: `${SITE_URL}/ai`,
          name: 'Ask Sahaya AI | Portfolio Assistant for AI Engineering',
          description: "Chat with Sahaya Savari F's portfolio assistant to learn about his AI Engineer skills, Machine Learning projects, Python, React, TypeScript, and Firebase work.",
          author: { '@id': `${SITE_URL}/#person` },
        },
        askSahayaAIAppSchema,
      ],
    };
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const ask = (text: string) => {
    if (!text.trim() || isTyping) return;
    const userMessage: Message = { id: Date.now().toString(), role: 'user', content: text.trim() };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);
    setTimeout(() => {
      setMessages(prev => [...prev, { id: (Date.now() + 1).toString(), role: 'ai', content: answerQuestion(userMessage.content) }]);
      setIsTyping(false);
    }, 600);
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
        <Link to="/" className="inline-flex items-center gap-2 text-white/50 hover:text-white mb-8 transition-colors font-body text-sm self-start">
          <ArrowLeft className="w-4 h-4" />
          Back to Portfolio
        </Link>
        
        <header className="mb-8 border-b border-white/10 pb-6 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-heading italic tracking-tight">Ask Sahaya AI</h1>
            <p className="text-sm font-body text-foreground/50">Portfolio assistant · Demo</p>
          </div>
        </header>

        <div className="flex flex-col bg-foreground/[0.02] border border-foreground/10 rounded-lg overflow-hidden mb-8 h-[600px] max-h-[75dvh] min-h-[350px]">
          <div className="flex-1 min-h-0 overflow-y-auto p-3 sm:p-6 space-y-6" role="log" aria-label="Portfolio conversation" aria-live="polite" aria-busy={isTyping}>
            {messages.map((msg) => (
              <div key={msg.id} className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.role === 'user' ? 'bg-white/20' : 'bg-white text-black'}`}>
                  {msg.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>
                <div className={`p-4 rounded-lg min-w-0 break-words whitespace-pre-line max-w-[80%] font-body text-sm leading-relaxed ${msg.role === 'user' ? 'bg-foreground/10 text-foreground rounded-tr-none' : 'bg-primary text-portfolio-ink rounded-tl-none'}`}>
                  {msg.content}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center shrink-0">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="p-4 rounded-2xl bg-white text-black rounded-tl-none font-body text-sm flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-black/50 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-1.5 h-1.5 bg-black/50 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-1.5 h-1.5 bg-black/50 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          <div className="p-4 border-t border-white/10 bg-black/50">
            <div className="flex flex-wrap gap-2 mb-3" aria-label="Suggested questions">
              {SUGGESTIONS.map(([label, question]) => <Button key={label} variant="glass" disabled={isTyping} className="!px-3 !py-2 !min-h-[36px] !text-xs" onClick={() => ask(question)}>{label}</Button>)}
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

        {/* Semantic Overview & Context */}
        <section aria-label="About Ask Sahaya AI" className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 font-body text-xs text-white/70 space-y-2">
          <h2 className="text-xs font-bold uppercase tracking-wider text-white/50">About Ask Sahaya AI</h2>
          <p className="leading-relaxed text-white/80">
            Ask Sahaya AI is an interactive portfolio assistant built to answer questions regarding Sahaya Savari's technical background in Artificial Intelligence, Machine Learning pipelines, Python APIs with FastAPI, React frontend development, and contact options.
          </p>
          <p className="text-white/50">
            Sample topics: <span className="text-white/80">"What are your core technical skills?"</span> · <span className="text-white/80">"Tell me about PrepMind AI"</span> · <span className="text-white/80">"How can I contact Sahaya?"</span>
          </p>
        </section>
      </div>
    </>
  );
}
