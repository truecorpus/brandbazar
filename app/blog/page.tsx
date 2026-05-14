import type { Metadata } from 'next';
import {
  articles,
  categories,
  getFeaturedArticle,
  getTrendingArticles,
  getAllArticles,
} from '@/lib/blog/data';
import { BlogHeader } from '@/components/blog/BlogHeader';
import { FeaturedHero } from '@/components/blog/FeaturedHero';
import { CategoryNav } from '@/components/blog/CategoryNav';
import { ArticleCard } from '@/components/blog/ArticleCard';
import { NewsletterCTA } from '@/components/blog/NewsletterCTA';
import { TrendingUp, Clock, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Journal',
  description:
    'Premium insights on corporate branding, employee experience, merchandise strategy, and design psychology. The BrandBazar editorial journal.',
  openGraph: {
    title: 'The BrandBazar Journal | Premium Branding Insights',
    description:
      'Editorial insights on corporate branding, employee kits, merchandise strategy, and visual identity.',
    type: 'website',
  },
};

export default function BlogPage() {
  const featured = getFeaturedArticle().meta;
  const trending = getTrendingArticles();
  const allArticles = getAllArticles().filter((a) => a.slug !== featured.slug);

  return (
    <>
      <BlogHeader />

      {/* Featured Hero */}
      <FeaturedHero article={featured} />

      {/* Category Navigation */}
      <section className="sticky top-16 z-[80] bg-ivory/95 backdrop-blur-xl border-b border-border/30 py-3">
        <div className="container-brand">
          <CategoryNav categories={categories} />
        </div>
      </section>

      {/* Trending Section */}
      {trending.length > 0 && (
        <section className="section-sm">
          <div className="container-brand">
            <div className="flex items-center gap-3 mb-8">
              <TrendingUp className="w-5 h-5 text-electric" />
              <h2 className="font-poppins text-h3 text-rich">Trending Now</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              {trending.map((article, i) => (
                <ArticleCard key={article.slug} article={article} index={i} variant="compact" />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Main Article Grid */}
      <section className="section-sm">
        <div className="container-brand">
          <div className="flex items-center justify-between mb-10">
            <h2 className="font-poppins text-h2 text-rich text-wrap-balance">Latest Stories</h2>
            <span className="text-sm text-charcoal/40 hidden sm:block">
              {allArticles.length + 1} articles
            </span>
          </div>

          {/* Editorial Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
            {/* First article - large */}
            {allArticles[0] && (
              <div className="lg:col-span-7">
                <ArticleCard article={allArticles[0]} index={0} variant="default" />
              </div>
            )}

            {/* Second article - stacked */}
            {allArticles[1] && (
              <div className="lg:col-span-5">
                <ArticleCard article={allArticles[1]} index={1} variant="default" />
              </div>
            )}

            {/* Third - horizontal */}
            {allArticles[2] && (
              <div className="lg:col-span-12">
                <ArticleCard article={allArticles[2]} index={2} variant="horizontal" />
              </div>
            )}

            {/* Remaining articles */}
            {allArticles.slice(3).map((article, i) => (
              <div key={article.slug} className="lg:col-span-4">
                <ArticleCard article={article} index={i + 3} variant="default" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <NewsletterCTA />
    </>
  );
}
