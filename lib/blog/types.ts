/**
 * BrandBazar Blog Type System
 * Scalable, CMS-ready architecture for premium editorial content.
 */

export interface Author {
  id: string;
  name: string;
  role: string;
  avatar: string;
  bio: string;
}

export interface Category {
  id: string;
  slug: string;
  name: string;
  description: string;
  color: string;
  articleCount: number;
}

export interface ArticleMeta {
  slug: string;
  title: string;
  excerpt: string;
  description: string;
  category: Category;
  author: Author;
  publishedAt: string;
  updatedAt?: string;
  readTime: number;
  featured: boolean;
  trending: boolean;
  coverImage: string;
  coverGradient: string;
  tags: string[];
}

export interface ArticleContent {
  meta: ArticleMeta;
  content: ArticleBlock[];
}

export type ArticleBlockType =
  | 'paragraph'
  | 'heading'
  | 'subheading'
  | 'quote'
  | 'image'
  | 'imageGrid'
  | 'pullQuote'
  | 'bulletList'
  | 'numberedList'
  | 'divider'
  | 'highlightBox'
  | 'insightBox'
  | 'statRow'
  | 'bigStat';

export interface ArticleBlock {
  type: ArticleBlockType;
  content?: string;
  items?: string[];
  caption?: string;
  stats?: { label: string; value: string }[];
  imageUrl?: string;
  images?: { url: string; caption: string }[];
}

export interface SearchResult {
  articles: ArticleMeta[];
  categories: Category[];
  tags: string[];
}
