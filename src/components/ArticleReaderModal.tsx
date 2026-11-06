import { useEffect, useRef, memo } from 'react';
import { X, Calendar, Clock, Share2, ExternalLink, CheckCircle2, Bookmark } from 'lucide-react';
import { Article } from '../data';
import { lockScroll, unlockScroll } from '../utils/scrollLock';

interface ArticleReaderModalProps {
  article: Article | null;
  onClose: () => void;
}

const ArticleReaderModal = memo(({ article, onClose }: ArticleReaderModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!article) return;

    // Save previous active element to restore focus on close
    previousFocusRef.current = document.activeElement as HTMLElement | null;
    lockScroll();

    // Move focus to the close button inside modal
    const focusTimer = setTimeout(() => {
      closeBtnRef.current?.focus();
    }, 50);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }

      // Trap Tab key within the modal
      if (e.key === 'Tab' && modalRef.current) {
        const focusable = modalRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      clearTimeout(focusTimer);
      unlockScroll();
      window.removeEventListener('keydown', handleKeyDown);
      previousFocusRef.current?.focus?.();
    };
  }, [article, onClose]);

  if (!article) return null;

  const linkedinShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(article.url || 'https://www.linkedin.com/in/sahaya-savari')}`;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="reader-article-title"
      className="fixed inset-0 z-[250] flex items-center justify-center p-4 sm:p-6 md:p-8 bg-black/85 backdrop-blur-xl animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        ref={modalRef}
        className="liquid-glass border border-white/20 w-full max-w-3xl max-h-[90vh] rounded-3xl overflow-hidden flex flex-col relative shadow-[0_25px_70px_rgba(0,0,0,0.8)]"
        onClick={(e) => e.stopPropagation()}
        style={{
          background: 'rgba(10, 10, 14, 0.92)',
          boxShadow: '0 0 0 1px rgba(255,255,255,0.08), 0 30px 80px rgba(0,0,0,0.9)',
        }}
      >
        {/* Sticky Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-black/50 backdrop-blur-md shrink-0">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono uppercase tracking-widest text-purple-300 px-2.5 py-0.5 rounded-full bg-purple-500/10 border border-purple-500/20">
              {article.category}
            </span>
            <span className="text-white/40 text-xs">•</span>
            <div className="flex items-center gap-1.5 text-xs font-mono text-white/60">
              <Clock size={12} />
              <span>{article.readingTime} min read</span>
            </div>
          </div>

          <button
            ref={closeBtnRef}
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 flex items-center justify-center text-white/70 hover:text-white transition-colors cursor-pointer"
            aria-label="Close article reader"
          >
            <X size={18} />
          </button>
        </div>

        {/* Scrollable Article Body */}
        <div className="overflow-y-auto px-6 sm:px-10 py-8 space-y-6 text-white/80 font-body text-sm sm:text-base leading-relaxed">
          {/* Article Header */}
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-white/50 mb-3">
              <Calendar size={13} />
              <span>{article.date}</span>
              <span>·</span>
              <span>By Sahaya Savari F</span>
            </div>

            <h1 id="reader-article-title" className="text-2xl sm:text-3xl md:text-4xl font-heading italic text-white tracking-tight leading-tight mb-4">
              {article.title}
            </h1>

            <p className="text-base sm:text-lg text-white/70 font-light italic leading-normal border-l-2 border-purple-400/50 pl-4 py-1">
              {article.excerpt}
            </p>
          </div>

          {/* Hero Image */}
          <div className="relative h-56 sm:h-72 w-full rounded-2xl overflow-hidden border border-white/10">
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          </div>

          {/* Key Takeaways */}
          {article.keyTakeaways && article.keyTakeaways.length > 0 && (
            <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-emerald-300">
                <Bookmark size={14} />
                <span>Executive Takeaways</span>
              </div>
              <ul className="space-y-2">
                {article.keyTakeaways.map((takeaway, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-white/80 font-light">
                    <CheckCircle2 size={15} className="text-emerald-400 shrink-0 mt-0.5" />
                    <span>{takeaway}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Main Content */}
          <div className="space-y-4 pt-2 text-white/85 font-light leading-relaxed">
            {article.content ? (
              <div className="whitespace-pre-line text-sm sm:text-base leading-relaxed space-y-4">
                {article.content}
              </div>
            ) : (
              <p>
                Full technical write-up, architectural schemas, and reproducible benchmarking notes for this engineering topic are published and maintained in my technical journal.
              </p>
            )}
          </div>

          {/* Author Bio Box */}
          <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <p className="text-xs font-mono uppercase tracking-wider text-white/50 mb-1">Author</p>
              <h4 className="text-base font-heading italic text-white">Sahaya Savari F</h4>
              <p className="text-xs text-white/60">M.Sc. AI Student &amp; Full Stack Developer · Overall Champion AIxcelerate 2026</p>
            </div>

            <div className="flex items-center gap-2">
              <a
                href={linkedinShareUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 text-white font-body text-xs font-medium transition-all"
                aria-label="Share article on LinkedIn"
              >
                <Share2 size={13} />
                <span>Share</span>
              </a>

              <a
                href="https://www.linkedin.com/in/sahaya-savari"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white text-black font-body text-xs font-semibold hover:scale-[1.02] active:scale-[0.98] transition-all"
                aria-label="Connect on LinkedIn"
              >
                <span>Connect</span>
                <ExternalLink size={13} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default ArticleReaderModal;