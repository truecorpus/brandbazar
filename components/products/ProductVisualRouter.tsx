import { ProductVisualMug } from './ProductVisualMug';
import { ProductVisualBottle } from './ProductVisualBottle';
import { ProductVisualNotebook } from './ProductVisualNotebook';
import { ProductVisualCard } from './ProductVisualCard';
import { ProductVisualPackaging } from './ProductVisualPackaging';
import { ProductVisualGift } from './ProductVisualGift';
import { ProductVisualKit } from './ProductVisualKit';

const visualMap: Record<string, (props: { accent?: string; className?: string }) => JSX.Element> = {
  'custom-mugs': ProductVisualMug,
  'branded-bottles': ProductVisualBottle,
  'premium-notebooks': ProductVisualNotebook,
  'id-cards': ProductVisualCard,
  'custom-packaging': ProductVisualPackaging,
  'corporate-gifts': ProductVisualGift,
  'employee-kits': ProductVisualKit,
};

export function ProductVisualRouter({ slug, accent, className }: { slug: string; accent?: string; className?: string }) {
  const Visual = visualMap[slug] || ProductVisualMug;
  return <Visual accent={accent} className={className} />;
}
