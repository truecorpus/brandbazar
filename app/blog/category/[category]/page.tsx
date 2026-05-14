import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import {
  categories,
  getCategoryBySlug,
  getArticlesByCategory,
} from '@/lib/blog/data';
import { BlogHeader } from '@/components/blog/BlogHeader';
import { CategoryNav } from '@/components/blog/CategoryNav';
import { ArticleCard } from '@/components/blog/ArticleCard';
import { NewsletterCTA } from '@/components/blog/NewsletterCTA';
import { FolderOpen } from 'lucide-react';

interface CategoryPageProps {
  params: { category: string };
}

export async function generateStaticParams() {
  const { categories } = await import('@/lib/blog/data');
  return categories.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const category = getCategoryBySlug(params.category);
  if (!category) return { title: 'Category Not Found' };

  return {
    title: `${category.name}`,
    description: category.description,
    openGraph: {
      title: `${category.name} | BrandBazar Journal`,
      description: category.description,
      type: 'website',
    },
  };
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const category = getCategoryBySlug(params.category);
  if (!category) return notFound();

  const articles = getArticlesByCategory(params.category);

  return (
    <>
      <BlogHeader />

      {/* Category Hero */}
      <section className="pt-24 pb-12 lg:pt-32 lg:pb-16">
        <div className="container-brand">
          <div className="max-w-3xl">
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-caption font-medium mb-6"
              style={{
                backgroundColor: `${category.color}15`,
                color: category.color,
              }}
            >
              <FolderOpen className="w-4 h-4" />
              {category.name}
            </div>

            <h1 className="font-poppins text-display-sm lg:text-display-md text-rich mb-4 text-wrap-balance">
              {category.name}
            </h1>
            <p className="text-body-lg text-charcoal/70 max-w-xl">
              {category.description}
            </p>

            <div className="mt-6 text-sm text-charcoal/40">
              {articles.length} {articles.length === 1 ? 'article' : 'articles'}
            </div>
          </div>
        </div>
      </section>

      {/* Category Nav */}
      <section className="sticky top-16 z-[80] bg-ivory/95 backdrop-blur-xl border-b border-border/30 py-3">
        <div className="container-brand">
          <CategoryNav categories={categories} activeCategory={params.category} />
        </div>
      </section>

      {/* Articles Grid */}
      <section className="section-sm">
        <div className="container-brand">
          {articles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.map((article, i) => (
                <ArticleCard key={article.slug} article={article} index={i} />
              ))}
            </div>
          ) : (
            <div className="text-center py-24">
              <FolderOpen className="w-12 h-12 text-charcoal/20 mx-auto mb-4" />
              <h3 className="font-poppins text-h3 text-rich mb-2">No articles yet</h3>
              <p className="text-charcoal/50">Articles in this category are coming soon.</p>
            </div>
          )}
        </div>
      </section>

      <NewsletterCTA />
    </>
  );
}
