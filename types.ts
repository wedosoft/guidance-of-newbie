
export interface Choice {
  id: string;
  text: string;
}

export interface Scenario {
  id: string;
  title: string;
  icon: string; // Font Awesome icon class, e.g., 'fa-tasks'
  description: string;
  choices: Choice[];
}

export interface ChatMessage {
  role: 'user' | 'model';
  content: string;
}
