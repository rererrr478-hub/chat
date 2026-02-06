
export interface Message {
  id: string;
  sender: string;
  text: string;
  timestamp: number;
  type: 'text' | 'system';
}

export type View = 'home' | 'create' | 'join' | 'chat';

export interface ChatSession {
  roomCode: string;
  userName: string;
}
