import type { Product } from '../types/product';

export const products: Record<string, Product> = {
  'meridian-chair': {
    id: 'meridian-chair',
    title: 'Meridian Chair',
    subtitle: 'No. 004 — Seating Collection',
    category: 'Seating',
    material: 'Patinated Brass & Natural Boucle',
    price: '€4,800',
    priceNumeric: 4800,
    year: '2025',
    image: 'https://images.unsplash.com/photo-1567016376408-0226e4d0c1ea?auto=format&fit=crop&w=800&q=85',
    description:
      'The Meridian Chair emerges from a meditation on threshold — that charged moment between rest and readiness. Its patinated brass frame traces a single continuous line from floor to headrest, interrupted only by the weighted calm of natural boucle.',
    details:
      'The frame is individually cast and hand-patinated over 72 hours, developing a unique oxidation pattern. The boucle is sourced from a family workshop in the French Pyrenees, woven to a custom density that holds its form across decades.',
    dimensions: 'H 82 × W 65 × D 72 cm',
    weight: '18 kg',
    lead: '8–10 weeks',
    images: [
      'https://images.unsplash.com/photo-1567016376408-0226e4d0c1ea?auto=format&fit=crop&w=1200&q=90',
      'https://images.unsplash.com/photo-1552858725-2758b5fb1286?auto=format&fit=crop&w=1200&q=90',
      'https://images.unsplash.com/photo-1599696848652-f0ff23bc911f?auto=format&fit=crop&w=1200&q=90',
    ],
    relatedMaterials: ['Patinated Brass', 'Natural Boucle', 'Smoked Oak'],
    aiSuggestions: ['Void Collective Table', 'Solstice Floor Lamp', 'Strata Side Table'],
    featured: true,
  },
  'solstice-lamp': {
    id: 'solstice-lamp',
    title: 'Solstice Floor Lamp',
    category: 'Lighting',
    material: 'Oxidized Bronze',
    price: '€2,200',
    priceNumeric: 2200,
    year: '2025',
    image: 'https://images.unsplash.com/photo-1552858725-2758b5fb1286?auto=format&fit=crop&w=800&q=85',
    images: ['https://images.unsplash.com/photo-1552858725-2758b5fb1286?auto=format&fit=crop&w=1200&q=90'],
    lead: '4–6 weeks',
    featured: true,
  },
  'strata-table': {
    id: 'strata-table',
    title: 'Strata Side Table',
    category: 'Tables',
    material: 'Calacatta Marble & Steel',
    price: '€3,400',
    priceNumeric: 3400,
    year: '2024',
    image: 'https://images.unsplash.com/photo-1724582586495-d050726cf354?auto=format&fit=crop&w=800&q=85',
    images: ['https://images.unsplash.com/photo-1724582586495-d050726cf354?auto=format&fit=crop&w=1200&q=90'],
    featured: true,
  },
  'vesper-sofa': {
    id: 'vesper-sofa',
    title: 'Vesper Sofa',
    category: 'Seating',
    material: 'Linen & Walnut',
    price: '€12,600',
    priceNumeric: 12600,
    year: '2025',
    image: 'https://images.unsplash.com/photo-1599696848652-f0ff23bc911f?auto=format&fit=crop&w=800&q=85',
    images: ['https://images.unsplash.com/photo-1599696848652-f0ff23bc911f?auto=format&fit=crop&w=1200&q=90'],
  },
  'nocturne-lamp': {
    id: 'nocturne-lamp',
    title: 'Nocturne Table Lamp',
    category: 'Lighting',
    material: 'Spun Brass & Opal Glass',
    price: '€1,600',
    priceNumeric: 1600,
    year: '2024',
    image: 'https://images.unsplash.com/photo-1552858725-a19e7fcd3ac4?auto=format&fit=crop&w=800&q=85',
    images: ['https://images.unsplash.com/photo-1552858725-a19e7fcd3ac4?auto=format&fit=crop&w=1200&q=90'],
  },
  'atlas-desk': {
    id: 'atlas-desk',
    title: 'Atlas Writing Desk',
    category: 'Tables',
    material: 'Smoked Oak & Leather',
    price: '€7,200',
    priceNumeric: 7200,
    year: '2025',
    image: 'https://images.unsplash.com/photo-1757439402103-fc35542f96f8?auto=format&fit=crop&w=800&q=85',
    images: ['https://images.unsplash.com/photo-1757439402103-fc35542f96f8?auto=format&fit=crop&w=1200&q=90'],
  },
  'threshold-chair': {
    id: 'threshold-chair',
    title: 'Threshold Lounge',
    category: 'Seating',
    material: 'Hand-cast Concrete & Wool',
    price: '€5,400',
    priceNumeric: 5400,
    year: '2025',
    image: 'https://images.unsplash.com/photo-1757439402127-b786187f9bc2?auto=format&fit=crop&w=800&q=85',
    images: ['https://images.unsplash.com/photo-1757439402127-b786187f9bc2?auto=format&fit=crop&w=1200&q=90'],
  },
  'lumen-shelf': {
    id: 'lumen-shelf',
    title: 'Lumen Wall System',
    category: 'Objects',
    material: 'Blackened Steel',
    price: '€3,800',
    priceNumeric: 3800,
    year: '2024',
    image: 'https://images.unsplash.com/photo-1757439402190-99b73ac8e807?auto=format&fit=crop&w=800&q=85',
    images: ['https://images.unsplash.com/photo-1757439402190-99b73ac8e807?auto=format&fit=crop&w=1200&q=90'],
  },
};

/** Flat array for grid/list rendering */
export const productList: Product[] = Object.values(products);

/** Featured products for HomePage */
export const featuredProducts: Product[] = productList.filter((p) => p.featured);

/** Default cart items for CheckoutPage demo */
export const defaultCartItems = [
  { ...products['meridian-chair'], quantity: 1 },
  { ...products['solstice-lamp'],  quantity: 1 },
];
