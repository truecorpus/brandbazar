import { useParams, Link, Navigate } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppFab from "@/components/WhatsAppFab";
import BackToTop from "@/components/BackToTop";
import { blogPosts } from "@/data/blogPosts";
import { ArrowLeft, ArrowRight, Clock, Calendar, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = blogPosts.find((p) => p.slug === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!post) return <Navigate to="/blog" replace />;

  const currentIndex = blogPosts.findIndex((p) => p.slug === slug);
  const prevPost = currentIndex > 0 ? blogPosts[currentIndex - 1] : null;
  const nextPost = currentIndex < blogPosts.length - 1 ? blogPosts[currentIndex + 1] : null;
  const relatedPosts = blogPosts.filter((p) => p.slug !== slug && p.category === post.category).slice(0, 2);
  if (relatedPosts.length < 2) {
    const more = blogPosts.filter((p) => p.slug !== slug && !relatedPosts.includes(p)).slice(0, 2 - relatedPosts.length);
    relatedPosts.push(...more);
  }

  const renderMarkdown = (content: string) => {
    return content.split("\n\n").map((block, i) => {
      if (block.startsWith("## ")) {
        return (
          <h2 key={i} className="font-heading font-semibold text-xl text-foreground mt-10 mb-4">
            {block.replace("## ", "")}
          </h2>
        );
      }
      if (block.startsWith("**") && block.includes(":**")) {
        const lines = block.split("\n");
        return (
          <div key={i} className="my-4">
            {lines.map((line, j) => {
              const boldMatch = line.match(/^\*\*(.*?)\*\*(.*)/);
              if (boldMatch) {
                return (
                  <p key={j} className="text-[15px] text-foreground/90 leading-relaxed mb-1.5">
                    <strong className="font-semibold text-foreground">{boldMatch[1]}</strong>
                    {boldMatch[2]}
                  </p>
                );
              }
              return (
                <p key={j} className="text-[15px] text-foreground/80 leading-relaxed mb-1.5">
                  {line}
                </p>
              );
            })}
          </div>
        );
      }
      if (block.startsWith("- ")) {
        const items = block.split("\n").filter((l) => l.startsWith("- "));
        return (
          <ul key={i} className="my-4 space-y-2 pl-1">
            {items.map((item, j) => {
              const text = item.replace("- ", "");
              const boldMatch = text.match(/^\*\*(.*?)\*\*(.*)/);
              return (
                <li key={j} className="flex gap-2.5 text-[15px] text-foreground/80 leading-relaxed">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                  {boldMatch ? (
                    <span>
                      <strong className="font-semibold text-foreground">{boldMatch[1]}</strong>
                      {boldMatch[2]}
                    </span>
                  ) : (
                    <span>{text}</span>
                  )}
                </li>
              );
            })}
          </ul>
        );
      }
      // Regular paragraph with inline bold
      const parts = block.split(/(\*\*.*?\*\*)/g);
      return (
        <p key={i} className="text-[15px] text-foreground/80 leading-[1.8] mb-4">
          {parts.map((part, j) => {
            if (part.startsWith("**") && part.endsWith("**")) {
              return (
                <strong key={j} className="font-semibold text-foreground">
                  {part.slice(2, -2)}
                </strong>
              );
            }
            return <span key={j}>{part}</span>;
          })}
        </p>
      );
    });
  };

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({ title: post.title, url: window.location.href });
    } else {
      await navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero image */}
      <div className="pt-16">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12">
          <Link
            to="/blog"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
          >
            <ArrowLeft size={14} />
            Back to blog
          </Link>

          <div className="max-w-[800px]">
            <div className="flex items-center gap-2 mb-4">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-medium bg-primary/[0.08] text-primary border border-primary/[0.12]">
                {post.category}
              </span>
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                <Clock size={12} />
                {post.readTime}
              </span>
            </div>
            <h1 className="font-heading font-semibold text-2xl sm:text-3xl lg:text-[36px] text-foreground leading-[1.2] tracking-tight">
              {post.title}
            </h1>
            <p className="mt-4 text-[15px] sm:text-base text-muted-foreground leading-relaxed max-w-[640px]">
              {post.excerpt}
            </p>

            {/* Author bar */}
            <div className="mt-6 flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-sm font-semibold text-primary">
                    {post.author.split(" ").map((n) => n[0]).join("")}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">{post.author}</p>
                  <p className="text-xs text-muted-foreground">{post.authorRole}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Calendar size={13} />
                  {post.date}
                </span>
                <button
                  onClick={handleShare}
                  className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Share2 size={13} />
                  Share
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Featured image */}
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 mt-8">
          <div className="rounded-2xl overflow-hidden border border-border">
            <img
              src={post.image}
              alt={post.title}
              className="w-full aspect-[21/9] object-cover"
              width={1200}
              height={514}
            />
          </div>
        </div>
      </div>

      {/* Content */}
      <article className="max-w-[720px] mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        {renderMarkdown(post.content)}
      </article>

      {/* Prev / Next navigation */}
      <div className="max-w-[720px] mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="border-t border-border pt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {prevPost ? (
            <Link
              to={`/blog/${prevPost.slug}`}
              className="group card-modern p-5 flex flex-col"
            >
              <span className="text-[11px] text-muted-foreground mb-1.5 flex items-center gap-1">
                <ArrowLeft size={11} /> Previous
              </span>
              <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors line-clamp-2">
                {prevPost.title}
              </span>
            </Link>
          ) : (
            <div />
          )}
          {nextPost && (
            <Link
              to={`/blog/${nextPost.slug}`}
              className="group card-modern p-5 flex flex-col items-end text-right"
            >
              <span className="text-[11px] text-muted-foreground mb-1.5 flex items-center gap-1">
                Next <ArrowRight size={11} />
              </span>
              <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors line-clamp-2">
                {nextPost.title}
              </span>
            </Link>
          )}
        </div>
      </div>

      {/* Related posts */}
      {relatedPosts.length > 0 && (
        <section className="pb-20 lg:pb-28">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-heading font-semibold text-xl text-foreground mb-8">You might also like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {relatedPosts.map((rp) => (
                <Link
                  key={rp.slug}
                  to={`/blog/${rp.slug}`}
                  className="group card-modern overflow-hidden flex flex-col"
                >
                  <div className="aspect-[16/10] overflow-hidden">
                    <img
                      src={rp.image}
                      alt={rp.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                      width={800}
                      height={512}
                    />
                  </div>
                  <div className="p-5">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-medium bg-secondary text-muted-foreground">
                      {rp.category}
                    </span>
                    <h3 className="mt-3 font-heading font-semibold text-[15px] text-foreground leading-snug group-hover:text-primary transition-colors">
                      {rp.title}
                    </h3>
                    <p className="mt-1.5 text-[13px] text-muted-foreground line-clamp-2">
                      {rp.excerpt}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
      <WhatsAppFab />
      <BackToTop />
    </div>
  );
};

export default BlogPost;
