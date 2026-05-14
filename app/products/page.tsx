import { Metadata } from 'next';
import { allProducts } from '@/lib/products/data';
import { ProductsHero } from '@/components/products/ProductsHero';
import { ProductGrid } from '@/components/products/ProductGrid';
import { MaterialPhilosophy } from '@/components/products/MaterialPhilosophy';
import { ProductsCTA } from '@/components/products/ProductsCTA';

export const metadata: Metadata = {
  title: 'Premium Product Collection | BrandBazar',
  description: 'Explore our curated collection of premium corporate branding products — from custom mugs and bottles to packaging, notebooks, and employee kits. Built for brands that value quality.',
  openGraph: {
    title: 'Premium Product Collection | BrandBazar',
    description: 'Explore our curated collection of premium corporate branding products.',
    type: 'website',
  },
};

export default function ProductsPage() {
  return (
    <>
      <ProductsHero />
      <ProductGrid />
      <MaterialPhilosophy />
      <ProductsCTA />
    </>
  );
}
