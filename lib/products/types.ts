export interface ProductMaterial {
  name: string;
  description: string;
  color: string;
}

export interface ProductFeature {
  title: string;
  description: string;
}

export interface ProductUseCase {
  title: string;
  description: string;
  solutionLink?: string;
}

export interface ProductCustomizationOption {
  name: string;
  description: string;
}

export interface ProductData {
  slug: string;
  name: string;
  category: string;
  tagline: string;
  description: string;
  accentColor: string;
  heroGradient: string;
  minQty: string;
  leadTime: string;
  priceRange?: string;
  pricePerUnit?: number;
  currency?: string;
  materials: ProductMaterial[];
  features: ProductFeature[];
  useCases: ProductUseCase[];
  customizationOptions: ProductCustomizationOption[];
}
