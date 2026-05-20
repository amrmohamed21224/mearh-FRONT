// ─── Studio / About ──────────────────────────────────────────────────────────

export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  image: string;
}

export interface StudioValue {
  number: string;
  title: string;
  body: string;
}

// ─── Checkout ────────────────────────────────────────────────────────────────

export interface CartItem {
  id: string;
  title: string;
  material: string;
  price: number;
  quantity: number;
  lead: string;
  image: string;
}

// ─── Consultation ─────────────────────────────────────────────────────────────

export interface ConsultationOption {
  id: string;
  label: string;
  desc: string;
}

export interface ConsultationStep {
  id: string;
  label: string;
  question: string;
  options: ConsultationOption[];
}

// ─── AI Analyzer ─────────────────────────────────────────────────────────────

export interface AnalysisResult {
  category: string;
  score: number;
  label: string;
  insights: string[];
}

export interface AISuggestion {
  title: string;
  reason: string;
  image: string;
  type: string;
}
