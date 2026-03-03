export enum View {
  Dashboard = 'dashboard',
  Chat = 'chat',
  Quiz = 'quiz',
  Live = 'live'
}

export interface Message {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
  attachment?: {
    data: string;
    mimeType: string;
    name: string;
  };
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface StudyNote {
  id: string;
  title: string;
  content: string;
  tags: string[];
}
