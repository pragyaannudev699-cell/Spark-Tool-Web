export enum LoadingState {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}

export enum AppView {
  HOME = 'HOME',
  RECIPE = 'RECIPE',
  BEAN_ANALYZER = 'BEAN_ANALYZER',
  CHAT = 'CHAT'
}

export interface Ingredient {
  name: string;
  amount: string;
}

export interface Step {
  instruction: string;
  duration?: string; // e.g., "30s"
}

export interface CoffeeRecipe {
  title: string;
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Expert';
  prepTime: string;
  ingredients: Ingredient[];
  steps: Step[];
  tags: string[];
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}

export interface BeanAnalysisResult {
  roastLevel: string;
  probableOrigin: string;
  tastingNotes: string[];
  brewingRecommendation: string;
  confidence: string;
}