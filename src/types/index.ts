export type ChatMessage = {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  isOptimized?: boolean;
};

export type Version = {
  id: string;
  code: string;
  createdAt: string;
};
