import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppFab from "@/components/WhatsAppFab";
import BackToTop from "@/components/BackToTop";
import { blogPosts } from "@/data/blogPosts";
import { ArrowRight, Clock, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import SEOHead from "@/components/SEOHead";

const categories = ["All", ...Array.from(new Set(blogPosts.map((p) => p.category)))];

const Blog = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const els = document.querySelectorAll("[data-blog-animate]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.06 }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [activeCategory, searchQuery]);

  const filtered = blogPosts.filter((post) => {
    const matchCat = activeCategory === "All" || post.category === activeCategory;
    const matchSearch =
      !searchQuery ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  const featured = blogPosts.filter((p) => p.featured);

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Blog — BrandBazaar | Corporate Gifting Insights & Guides"
        description="Expert tips on corporate gifting, print technology, branding strategy, and creating merchandise people love."
        canonical="https://brandbazar.lovable.app/blog"
      />
      <Navbar />

      {/* Hero */}
      <section className="pt-28 sm:pt-32 lg:pt-36 pb-16 lg:pb-20 bg-background relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-primary/[0.03] blur-[120px] pointer-events-none" />
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-[640px] mx-auto">
            <span className="section-label">Our Blog</span>
            <h1 className="section-heading mt-3">Insights, guides & inspiration</h1>
            <p className="section-subtext">
              Expert tips on corporate gifting, print technology, branding strategy, and creating merchandise people actually love.
            </p>
          </div>

          {/* Search */}
          <div className="mt-10 max-w-[480px] mx-auto relative">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-11 pl-10 pr-4 rounded-xl border border-border bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition-all"
            />
          </div>

          {/* Categories */}
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                  activeCategory === cat
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "bg-secondary text-muted-foreground hover:text-foreground hover:bg-secondary/80"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured posts */}
      {activeCategory === "All" && !searchQuery && featured.length > 0 && (
        <section className="pb-16 lg:pb-20">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {featured.map((post, i) => (
                <Link
                  key={post.slug}
                  to={`/blog/${post.slug}`}
                  className="group card-modern overflow-hidden"
                  data-blog-animate
                  style={{ animationDelay: `${i * 0.08}s` }}
                >
                  <div className="aspect-[16/9] overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                      width={800}
                      height={512}
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-medium bg-primary/[0.08] text-primary border border-primary/[0.12]">
                        Featured
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-medium bg-secondary text-muted-foreground">
                        {post.category}
                      </span>
                    </div>
                    <h2 className="font-heading font-semibold text-lg text-foreground leading-snug group-hover:text-primary transition-colors">
                      {post.title}
                    </h2>
                    <p className="mt-2 text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                      {post.excerpt}
                    </p>
                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span>{post.author}</span>
                        <span className="w-1 h-1 rounded-full bg-border" />
                        <span>{post.date}</span>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock size={12} />
                        {post.readTime}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All posts grid */}
      <section className="pb-20 lg:pb-28">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          {activeCategory === "All" && !searchQuery && (
            <h2 className="font-heading font-semibold text-xl text-foreground mb-8">All articles</h2>
          )}

          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-muted-foreground text-sm">No articles found. Try a different search or category.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((post, i) => (
                <Link
                  key={post.slug}
                  to={`/blog/${post.slug}`}
                  className="group card-modern overflow-hidden flex flex-col"
                  data-blog-animate
                  style={{ animationDelay: `${i * 0.06}s` }}
                >
                  <div className="aspect-[16/10] overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                      width={800}
                      height={512}
                    />
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-medium bg-secondary text-muted-foreground">
                        {post.category}
                      </span>
                      <span className="flex items-center gap-1 text-[11px] text-muted-foreground">
                        <Clock size={11} />
                        {post.readTime}
                      </span>
                    </div>
                    <h3 className="font-heading font-semibold text-[15px] text-foreground leading-snug group-hover:text-primary transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="mt-2 text-[13px] text-muted-foreground line-clamp-2 leading-relaxed flex-1">
                      {post.excerpt}
                    </p>
                    <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                          <span className="text-[10px] font-semibold text-primary">
                            {post.author.split(" ").map((n) => n[0]).join("")}
                          </span>
                        </div>
                        <div className="text-xs text-muted-foreground">{post.author}</div>
                      </div>
                      <span className="text-xs text-muted-foreground">{post.date}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="pb-20 lg:pb-28">
        <div className="max-w-[800px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="card-modern p-8 sm:p-12 text-center relative overflow-hidden">
            <div className="absolute inset-0 surface-dot-pattern opacity-40 pointer-events-none" />
            <div className="relative">
              <span className="section-label">Ready to order?</span>
              <h2 className="font-heading font-semibold text-xl sm:text-2xl text-foreground mt-3">
                Turn your brand into something people can hold
              </h2>
              <p className="text-sm text-muted-foreground mt-3 max-w-[440px] mx-auto">
                From mugs to merch kits — get a free quote in under 2 minutes.
              </p>
              <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
                <Button asChild size="lg">
                  <Link to="/#quote">
                    Get a free quote
                    <ArrowRight size={14} />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link to="/shop">Browse products</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppFab />
      <BackToTop />
    </div>
  );
};

export default Blog;
