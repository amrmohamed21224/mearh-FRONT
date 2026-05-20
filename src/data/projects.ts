import type { Project } from '../types/project';

export const projects: Record<string, Project> = {
  'casa-pietra': {
    id: 'casa-pietra',
    title: 'Casa Pietra',
    subtitle: 'Tuscany Villa Restoration',
    year: '2024',
    category: 'Residential',
    location: 'Siena, Italy',
    area: '680 m²',
    image: 'https://images.unsplash.com/photo-1683290844875-0eee4089069a?auto=format&fit=crop&w=1200&q=85',
    description: 'A 16th-century stone farmhouse reimagined through contemporary minimalism.',
    featured: true,
    heroImage: 'https://images.unsplash.com/photo-1683290844875-0eee4089069a?auto=format&fit=crop&w=2400&q=90',
    duration: '22 months',
    chapters: [
      {
        type: 'text',
        label: 'I — The Brief',
        title: 'A house that has memory.',
        body: 'The client came to us not with a program, but with a feeling. They wanted to live in a place that had already lived — that carried the weight and warmth of stone, of time, of hands. The brief, eventually reduced to a single page, asked only for four things: silence, light, permanence, and the smell of old wood after rain.',
      },
      {
        type: 'image',
        image: 'https://images.unsplash.com/photo-1777603371625-fe9aa715dc39?auto=format&fit=crop&w=2400&q=85',
        caption: 'The north courtyard, before intervention. The original travertine paving was preserved in its entirety.',
      },
      {
        type: 'text',
        label: 'II — The Approach',
        title: 'Subtraction as strategy.',
        body: 'We began by removing. Over three months, we carefully catalogued every material, every structural element, every threshold. The villa had been modified four times since 1542. Our work was archaeological before it was architectural — understanding which layers were original and which were accretion.',
      },
      {
        type: 'dual-image',
        images: [
          'https://images.unsplash.com/photo-1758448756362-e323282ccbcc?auto=format&fit=crop&w=1200&q=85',
          'https://images.unsplash.com/photo-1599968164773-c01cf3159a67?auto=format&fit=crop&w=1200&q=85',
        ],
        captions: [
          'Material library — textures and samples collected during the survey phase.',
          'Structural mapping. The main barrel vault dates to the 16th century.',
        ],
      },
      {
        type: 'text',
        label: 'III — The Resolution',
        title: 'New elements declared openly.',
        body: 'Where we intervened, we did so with clarity. A new steel stair, deliberately contemporary, meets the stone floor without apology. A long slab of Pietra Serena serves as kitchen surface, table, and threshold simultaneously. New windows are precise incisions — not imitating the old but respecting their geometry.',
      },
      {
        type: 'fullscreen-image',
        image: 'https://images.unsplash.com/photo-1541848212-388760a351b9?auto=format&fit=crop&w=2400&q=90',
        caption: 'The main living hall at dusk. The original stone walls required no treatment — only cleaning.',
      },
      {
        type: 'stats',
        items: [
          { label: 'Original stone retained', value: '94%' },
          { label: 'New materials introduced', value: '3' },
          { label: 'Construction period', value: '22 mo' },
          { label: 'Craftspeople involved', value: '12' },
        ],
      },
    ],
    credits: [
      { role: 'Lead Architect',      name: 'Marco Vesper' },
      { role: 'Interior Design',     name: 'Elena Montis' },
      { role: 'Structural Engineering', name: 'Studio Ferrini' },
      { role: 'Photography',         name: 'Luca d\'Orsi' },
    ],
  },

  'arc-lumineux': {
    id: 'arc-lumineux',
    title: 'Arc Lumineux',
    subtitle: 'Parisian Penthouse',
    year: '2025',
    category: 'Interior',
    location: 'Paris, France',
    area: '320 m²',
    image: 'https://images.unsplash.com/photo-1777603371625-fe9aa715dc39?auto=format&fit=crop&w=1200&q=85',
    description: 'Light as architecture. Brass and marble in dialogue with Haussmann geometry.',
    featured: true,
    heroImage: 'https://images.unsplash.com/photo-1777603371625-fe9aa715dc39?auto=format&fit=crop&w=2400&q=90',
  },

  'void-collective': {
    id: 'void-collective',
    title: 'Void Collective',
    subtitle: 'Tokyo Gallery Space',
    year: '2025',
    category: 'Commercial',
    location: 'Tokyo, Japan',
    area: '240 m²',
    image: 'https://images.unsplash.com/photo-1758448756362-e323282ccbcc?auto=format&fit=crop&w=1200&q=85',
    description: 'Negative space as the primary material. An essay in architectural restraint.',
    featured: false,
    heroImage: 'https://images.unsplash.com/photo-1758448756362-e323282ccbcc?auto=format&fit=crop&w=2400&q=90',
  },

  'meridian-house': {
    id: 'meridian-house',
    title: 'Meridian House',
    subtitle: 'Malibu Cliff Residence',
    year: '2024',
    category: 'Residential',
    location: 'Malibu, USA',
    area: '980 m²',
    image: 'https://images.unsplash.com/photo-1599968164773-c01cf3159a67?auto=format&fit=crop&w=1200&q=85',
    description: 'Where the Pacific horizon becomes the primary wall.',
    featured: false,
  },

  'thermal-retreat': {
    id: 'thermal-retreat',
    title: 'Thermal Retreat',
    subtitle: 'Alpine Spa & Residence',
    year: '2025',
    category: 'Hospitality',
    location: 'Zermatt, Switzerland',
    area: '1,200 m²',
    image: 'https://images.unsplash.com/photo-1541848212-388760a351b9?auto=format&fit=crop&w=1200&q=85',
    description: 'Stone, water, and silence as the architecture of restoration.',
    featured: false,
  },

  'campo-studio': {
    id: 'campo-studio',
    title: 'Campo Studio',
    subtitle: 'Creative Campus',
    year: '2023',
    category: 'Commercial',
    location: 'Milan, Italy',
    area: '1,800 m²',
    image: 'https://images.unsplash.com/photo-1743708282103-99ca20d4803f?auto=format&fit=crop&w=1200&q=85',
    description: 'An adaptive reuse of a 1960s industrial building into a creative campus.',
    featured: false,
  },
};

/** Flat array for list/grid rendering */
export const projectList: Project[] = Object.values(projects);

/** Featured projects for HomePage */
export const featuredProjects: Project[] = projectList.filter((p) => p.featured);

/** Fallback for unknown project IDs */
export const defaultProject = projects['casa-pietra'];
