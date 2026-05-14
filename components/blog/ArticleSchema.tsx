import { ArticleMeta } from '@/lib/blog/types';
import { SITE_URL, BRAND_NAME } from '@/lib/config';

interface ArticleSchemaProps {
  article: ArticleMeta;
}

export function ArticleSchema({ article }: ArticleSchemaProps) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: article.title,
    description: article.description,
    image: `${SITE_URL}/opengraph-image`,
    datePublished: article.publishedAt,
    dateModified: article.updatedAt || article.publishedAt,
    author: {
      '@type': 'Person',
      name: article.author.name,
      jobTitle: article.author.role,
    },
    publisher: {
      '@type': 'Organization',
      name: BRAND_NAME,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/logo.svg`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/blog/${article.slug}`,
    },
    articleSection: article.category.name,
    keywords: article.tags.join(', '),
    wordCount: article.readTime * 200,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
