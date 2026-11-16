import { TaskPriority, TaskStatus } from '../dto/create-task.dto';

export interface Task {
  id: number;
  title: string;
  description: string | null;
  status: TaskStatus;
  priority: TaskPriority;
  createdAt: Date;
}