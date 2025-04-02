export interface Task {
  id: string;
  title: string;
  completed: boolean;
  createdAt: Date;
}

export type TaskFilter = 'all' | 'completed' | 'pending';

export interface Theme {
  background: string;
  text: string;
  primary: string;
  secondary: string;
  border: string;
  shadow: string;
  hover: string;
} 