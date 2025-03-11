
export interface Task {
  id: string;
  title: string;
  completed: boolean;
  category: string;
  createdAt: Date;
  dueDate?: Date;
  priority: 'low' | 'medium' | 'high';
  description?: string;
}
