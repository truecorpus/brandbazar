import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getProductBySlug, getRelatedProducts, allProducts } from '@/lib/products/data';
import { ProductHero } from '@/components/products/ProductHero';
import { ProductMaterials } from '@/components/products/ProductMaterials';
import { ProductFeatures } from '@/components/products/ProductFeatures';
import { ProductUseCases } from '@/components/products/ProductUseCases';
import { ProductCustomizations } from '@/components/products/ProductCustomizations';
import { ProductRelated } from '@/components/products/ProductRelated';
import { ProductsCTA } from '@/components/products/ProductsCTA';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return {};

  return {
    title: `${product.name} | BrandBazar`,
    description: product.description,
    alternates: {
      canonical: `/products/${slug}`,
    },
    openGraph: {
      title: `${product.name} | BrandBazar`,
      description: product.description,
      type: 'website',
    },
  };
}

export async function generateStaticParams() {
  return allProducts.map((p) => ({ slug: p.slug }));
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const related = getRelatedProducts(slug, 3);

  return (
    <>
      <ProductHero product={product} />
      <ProductMaterials product={product} />
      <ProductFeatures product={product} />
      <ProductUseCases product={product} />
      <ProductCustomizations product={product} />
      <ProductRelated product={product} related={related} />
      <ProductsCTA />
    </>
  );
}
