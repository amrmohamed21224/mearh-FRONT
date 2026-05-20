export type ProjectCategory = 'Residential' | 'Interior' | 'Commercial' | 'Hospitality';

export type ProjectChapter =
  | { type: 'text';           label: string; title: string; body: string }
  | { type: 'image';          image: string; caption?: string }
  | { type: 'dual-image';     images: [string, string]; captions?: [string, string] }
  | { type: 'fullscreen-image'; image: string; caption?: string }
  | { type: 'stats';          items: { label: string; value: string }[] };

export interface ProjectCredit {
  role: string;
  name: string;
}

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  year: string;
  category: ProjectCategory;
  location: string;
  area: string;
  image: string;
  description: string;
  featured?: boolean;
  // Story page fields
  heroImage?: string;
  duration?: string;
  chapters?: ProjectChapter[];
  credits?: ProjectCredit[];
}
