import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import {
  getArticleBySlug,
  getRelatedArticles,
} from '@/lib/blog/data';
import { BlogHeader } from '@/components/blog/BlogHeader';
import { ReadingProgress } from '@/components/blog/ReadingProgress';
import { ArticleContent } from '@/components/blog/ArticleContent';
import { ArticleAuthor } from '@/components/blog/ArticleAuthor';
import { ArticleCTA } from '@/components/blog/ArticleCTA';
import { RelatedArticles } from '@/components/blog/RelatedArticles';
import { NewsletterCTA } from '@/components/blog/NewsletterCTA';
import { ArticleSchema } from '@/components/blog/ArticleSchema';
import { ScrollToTop } from '@/components/blog/ScrollToTop';
import { Clock, Calendar, ChevronRight, TrendingUp, BookOpen } from 'lucide-react';
import Link from 'next/link';

interface ArticlePageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  const { articles } = await import('@/lib/blog/data');
  return articles.map((a) => ({ slug: a.meta.slug }));
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const article = getArticleBySlug(params.slug);
  if (!article) return { title: 'Article Not Found' };

  return {
    title: article.meta.title,
    description: article.meta.description,
    authors: [{ name: article.meta.author.name }],
    alternates: {
      canonical: `/blog/${params.slug}`,
    },
    openGraph: {
      title: article.meta.title,
      description: article.meta.description,
      type: 'article',
      publishedTime: article.meta.publishedAt,
      authors: [article.meta.author.name],
      tags: article.meta.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: article.meta.title,
      description: article.meta.description,
    },
  };
}

export default function ArticlePage({ params }: ArticlePageProps) {
  const article = getArticleBySlug(params.slug);
  if (!article) return notFound();

  const { meta, content } = article;
  const related = getRelatedArticles(params.slug);

  return (
    <>
      <ArticleSchema article={meta} />
      <ReadingProgress />
      <BlogHeader showBackLink />

      {/* ════════════════════════════════════════
          CINEMATIC ARTICLE HERO
          ════════════════════════════════════════ */}
      <header
        className={`
          relative min-h-[92vh] flex flex-col justify-end overflow-hidden
          bg-gradient-to-br ${meta.coverGradient}
        `}
      >
        {/* Atmospheric layers */}
        <div className="absolute inset-0 texture-dots opacity-[0.025]" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-ivory" />

        {/* Floating ambient orbs */}
        <div className="absolute top-[15%] right-[10%] w-[500px] h-[500px] rounded-full bg-electric/[0.04] blur-[100px] animate-breathe" />
        <div className="absolute top-[40%] left-[5%] w-[400px] h-[400px] rounded-full bg-lavender/[0.06] blur-[80px] animate-breathe" style={{ animationDelay: '3s' }} />
        <div className="absolute bottom-[20%] right-[30%] w-[300px] h-[300px] rounded-full bg-electric/[0.03] blur-[60px] animate-breathe" style={{ animationDelay: '6s' }} />

        {/* Hero content */}
        <div className="relative z-10 container-brand w-full pb-16 lg:pb-24 pt-32">
          <div className="max-w-[800px]">
            {/* Breadcrumb — refined and subtle */}
            <nav aria-label="Breadcrumb" className="mb-8">
              <ol className="flex items-center gap-2.5 text-[13px] text-charcoal/40">
                <li>
                  <Link href="/blog" className="hover:text-electric transition-colors duration-300 flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5" />
                    Journal
                  </Link>
                </li>
                <li>
                  <ChevronRight className="w-3 h-3" />
                </li>
                <li>
                  <Link
                    href={`/blog/category/${meta.category.slug}`}
                    className="hover:text-electric transition-colors duration-300"
                  >
                    {meta.category.name}
                  </Link>
                </li>
              </ol>
            </nav>

            {/* Category & trending badges */}
            <div className="flex items-center gap-3 mb-8">
              <Link
                href={`/blog/category/${meta.category.slug}`}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold tracking-wide uppercase bg-white/80 backdrop-blur-sm border border-white/40 hover:bg-white transition-all duration-300"
                style={{ color: meta.category.color }}
              >
                {meta.category.name}
              </Link>
              {meta.trending && (
                <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold tracking-wide uppercase bg-rich text-white">
                  <TrendingUp className="w-3.5 h-3.5" />
                  Trending
                </span>
              )}
            </div>

            {/* Editorial headline — oversized, carefully balanced */}
            <h1 className="font-poppins text-[32px] sm:text-[40px] lg:text-[52px] xl:text-[60px] font-bold text-rich leading-[1.08] tracking-[-0.03em] text-wrap-balance mb-8">
              {meta.title}
            </h1>

            {/* Excerpt — elegant lead paragraph */}
            <p className="text-[17px] lg:text-[19px] text-charcoal/65 leading-[1.7] max-w-[600px] mb-10 font-jakarta">
              {meta.excerpt}
            </p>

            {/* Premium metadata bar */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-electric/15 to-lavender/20 flex items-center justify-center">
                  <span className="text-sm font-bold text-electric font-poppins">
                    {meta.author.avatar}
                  </span>
                </div>
                <div>
                  <div className="text-[14px] font-semibold text-rich">{meta.author.name}</div>
                  <div className="text-xs text-charcoal/45">{meta.author.role}</div>
                </div>
              </div>

              {/* Separator */}
              <div className="hidden sm:block w-px h-8 bg-border/60" />

              {/* Date */}
              <div className="flex items-center gap-1.5 text-[13px] text-charcoal/45">
                <Calendar className="w-3.5 h-3.5" />
                <span>
                  {new Date(meta.publishedAt).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </span>
              </div>

              {/* Read time */}
              <div className="flex items-center gap-1.5 text-[13px] text-charcoal/45">
                <Clock className="w-3.5 h-3.5" />
                <span>{meta.readTime} min read</span>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <span className="text-xs text-charcoal/30 tracking-widest uppercase">Scroll</span>
          <div className="w-5 h-8 rounded-full border border-charcoal/15 flex items-start justify-center p-1.5">
            <div className="w-1 h-2 rounded-full bg-charcoal/25 animate-bounce" />
          </div>
        </div>
      </header>

      {/* ════════════════════════════════════════
          ARTICLE BODY
          ════════════════════════════════════════ */}
      <article className="relative py-16 lg:py-24">
        {/* Subtle background layer */}
        <div className="absolute inset-0 bg-gradient-to-b from-ivory via-white/50 to-ivory pointer-events-none" />

        <div className="container-brand relative z-10">
          <div className="max-w-[720px] mx-auto">
            <ArticleContent blocks={content} />

            {/* Inline CTA — natural placement after content */}
            <ArticleCTA variant="inline" />
          </div>
        </div>
      </article>

      {/* ════════════════════════════════════════
          AUTHOR SECTION
          ════════════════════════════════════════ */}
      <ArticleAuthor meta={meta} />

      {/* ════════════════════════════════════════
          FULL CTA
          ════════════════════════════════════════ */}
      <ArticleCTA variant="full" />

      {/* ════════════════════════════════════════
          RELATED ARTICLES
          ════════════════════════════════════════ */}
      <RelatedArticles articles={related} />

      {/* ════════════════════════════════════════
          NEWSLETTER
          ════════════════════════════════════════ */}
      <NewsletterCTA />
      <ScrollToTop />
    </>
  );
}
