export type ProductCategory = 'Seating' | 'Tables' | 'Lighting' | 'Objects' | 'Textiles';

export interface Product {
  id: string;
  title: string;
  subtitle?: string;
  category: ProductCategory;
  material: string;
  price: string;
  priceNumeric: number;
  year: string;
  image: string;
  description?: string;
  details?: string;
  dimensions?: string;
  weight?: string;
  lead?: string;
  images?: string[];
  relatedMaterials?: string[];
  aiSuggestions?: string[];
  featured?: boolean;
}
