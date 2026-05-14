export interface QuoteProduct {
  id: string;
  name: string;
  description: string;
  icon: string;
  gradient: string;
  accentColor: string;
  minQty: number;
  maxQty: number;
  defaultQty: number;
  qtyStep: number;
  priceRange: string;
}

export interface PackagingOption {
  id: string;
  name: string;
  description: string;
}

export interface TimelineOption {
  id: string;
  label: string;
  detail: string;
}

export interface BudgetOption {
  id: string;
  label: string;
}

export interface FileUpload {
  name: string;
  size: number;
  type: string;
  data: string;
}

export interface QuoteFormData {
  products: { productId: string; quantity: number }[];
  brandColor: string;
  packaging: string;
  hasLogo: boolean;
  hasGuidelines: boolean;
  logoFile: FileUpload | null;
  guidelinesFile: FileUpload | null;
  timeline: string;
  budget: string;
  name: string;
  email: string;
  company: string;
  phone: string;
  message: string;
}

export const initialQuoteData: QuoteFormData = {
  products: [],
  brandColor: '',
  packaging: '',
  hasLogo: false,
  hasGuidelines: false,
  logoFile: null,
  guidelinesFile: null,
  timeline: '',
  budget: '',
  name: '',
  email: '',
  company: '',
  phone: '',
  message: '',
};
