import { memo, useState, useCallback } from "react";
import { Link } from "@/lib/router-compat";
import { ArrowUpRight, BookOpen, Clock, Calendar, ExternalLink } from "lucide-react";
import { ARTICLES, Article } from "../data";
import SectionBadge from "../components/ui/SectionBadge";
import ArticleReaderModal from "../components/ArticleReaderModal";

const ArticleCard = ({ article, onRead }: { article: Article; onRead: () => void }) => {
  return (
    <div
      onClick={onRead}
      className="group relative flex flex-col bg-white/[0.02] border border-white/10 rounded-3xl overflow-hidden hover:bg-white/[0.04] hover:border-white/20 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 cursor-pointer"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onRead();
        }
      }}
      aria-label={`Read article: ${article.title}`}
    >
      <div className="relative h-48 w-full overflow-hidden">
        <img
          src={article.image}
          alt={article.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
          decoding="async"
          width={800}
          height={600}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
        <div className="absolute bottom-4 left-4 flex gap-2">
          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-white/90 bg-black/50 backdrop-blur-md border border-white/10">
            {article.category}
          </span>
        </div>
      </div>
      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-center gap-4 text-[10px] font-mono text-white/70 mb-3">
          <div className="flex items-center gap-1.5">
            <Calendar className="w-3 h-3" />
            <span>{article.date}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="w-3 h-3" />
            <span>{article.readingTime} min read</span>
          </div>
        </div>
        <h3 className="font-heading font-bold text-xl text-white mb-2 group-hover:text-purple-300 transition-colors">
          {article.title}
        </h3>
        <p className="text-sm font-body font-light text-white/70 mb-6 flex-1 line-clamp-3">
          {article.excerpt}
        </p>
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/[0.06]">
          <span className="text-xs font-body font-medium text-white/80 group-hover:text-white transition-colors">
            Read Full Article
          </span>
          <div className="w-8 h-8 rounded-full flex items-center justify-center bg-white/5 group-hover:bg-white group-hover:text-black transition-colors">
            <ArrowUpRight className="w-4 h-4" />
          </div>
        </div>
      </div>
    </div>
  );
};

const BlogSection = memo(() => {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  const handleCloseModal = useCallback(() => {
    setSelectedArticle(null);
  }, []);

  return (
    <>
      <section aria-label="Featured Articles" className="py-16 px-6 relative overflow-hidden">
        <div className="max-w-screen-xl mx-auto relative z-10">
          {/* Header Row */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-8">
            <div className="max-w-2xl">
              <SectionBadge>Writings & Articles</SectionBadge>
              <h2 className="text-fluid-section-heading font-heading font-bold text-white tracking-tight leading-[0.9] mb-4">
                Developer Blog &amp; <br /> Technical Insights.
              </h2>
              <p className="text-white/70 font-body font-light text-base md:text-lg leading-relaxed">
                Practical engineering write-ups covering computer vision in agriculture, technical
                SEO &amp; Core Web Vitals optimization, offline-first React state management, and
                high-throughput async Python backends.
              </p>
            </div>
            <p className="text-white/70 font-body font-light text-xs max-w-xs lg:text-right shrink-0">
              Interactive engineering notes with architecture breakdown and executive takeaways.
              Click any card to read inline.
            </p>
          </div>

          {/* Articles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mb-12">
            {ARTICLES.map((article) => (
              <ArticleCard
                key={article.title}
                article={article}
                onRead={() => setSelectedArticle(article)}
              />
            ))}
          </div>

          {/* Blog Navigation & LinkedIn */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/blog"
              className="group relative inline-flex items-center justify-center gap-2.5 h-12 px-7 rounded-full bg-white text-black font-body font-medium text-xs sm:text-sm overflow-hidden hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              <BookOpen className="w-4 h-4" />
              <span>Explore Technical Blog</span>
              <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />
            </Link>
            <a
              href="https://www.linkedin.com/in/sahaya-savari/recent-activity/all/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 h-12 px-6 rounded-full border border-white/15 bg-white/5 hover:bg-white/10 text-white font-body text-xs sm:text-sm font-medium transition-all"
            >
              <span>Read on LinkedIn</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-60" />
            </a>
          </div>
        </div>
      </section>

      {/* Interactive Reader Modal */}
      <ArticleReaderModal article={selectedArticle} onClose={handleCloseModal} />
    </>
  );
});

export default BlogSection;
