import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/config';
import { articles, categories } from '@/lib/blog/data';
import { allProducts } from '@/lib/products/data';
import { getAllSolutions } from '@/lib/solutions/data';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE_URL;

  // Main pages
  const mainPages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/solutions`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/products`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/faq`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/contact`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/quote`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/blog`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
  ];

  // Solution pages
  const solutionPages: MetadataRoute.Sitemap = getAllSolutions().map((solution) => ({
    url: `${baseUrl}/solutions/${solution.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  // Product pages
  const productPages: MetadataRoute.Sitemap = allProducts.map((product) => ({
    url: `${baseUrl}/products/${product.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.85,
  }));

  // Article pages
  const articlePages: MetadataRoute.Sitemap = articles.map((article) => ({
    url: `${baseUrl}/blog/${article.meta.slug}`,
    lastModified: new Date(article.meta.updatedAt || article.meta.publishedAt),
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  // Category pages
  const categoryPages: MetadataRoute.Sitemap = categories.map((category) => ({
    url: `${baseUrl}/blog/category/${category.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  return [...mainPages, ...solutionPages, ...productPages, ...articlePages, ...categoryPages];
}
