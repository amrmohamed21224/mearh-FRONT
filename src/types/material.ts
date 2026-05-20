export type MaterialFamily = 'Marble' | 'Metal' | 'Wood' | 'Stone' | 'Textile';

export interface Material {
  id: string;
  name: string;
  family: MaterialFamily;
  origin: string;
  color: string;
  accent: string;
  texture: string;
  hardness: string;
  finish: string[];
  applications: string[];
  character: string;
  image: string;
}
