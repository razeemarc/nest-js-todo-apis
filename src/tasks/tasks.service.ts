import { Injectable,NotFoundException } from '@nestjs/common';

import {
  CreateTaskDto,
  TaskPriority,
  TaskStatus,
} from './dto/create-task.dto';
import { Task } from './interfaces/task.interface';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {

private tasks: Task[] = [];
  private nextId = 1;

  create(createTaskDto: CreateTaskDto) {

    const newTask = {
      id: this.nextId++,
      title: createTaskDto.title,
      description: createTaskDto.description ?? null,
      status: createTaskDto.status ?? TaskStatus.PENDING,
      priority: createTaskDto.priority ?? TaskPriority.MEDIUM,
      createdAt: new Date(),
    };

    this.tasks.push(newTask);

    return newTask;
  }
  findAll(): Task[] {
  return this.tasks;
}
update(id: number, updateTaskDto: UpdateTaskDto): Task {

  const task = this.tasks.find(task => task.id === id);

  if (!task) {
    throw new NotFoundException(`Task with ID ${id} not found`);
  }

  Object.assign(task, updateTaskDto);

  return task;
}
findOne(id: number): Task {
  // Find the task using its ID
  const task = this.tasks.find((task) => task.id === id);

  // If task doesn't exist, throw 404 error
  if (!task) {
    throw new NotFoundException(`Task with ID ${id} not found`);
  }

  return task;
}
remove(id: number): { message: string } {
  // Find the index of the task
  const taskIndex = this.tasks.findIndex(
    (task) => task.id === id,
  );

  // Check whether the task exists
  if (taskIndex === -1) {
    throw new NotFoundException(
      `Task with ID ${id} not found`,
    );
  }

  // Remove the task from the array
  this.tasks.splice(taskIndex, 1);

  return {
    message: `Task with ID ${id} deleted successfully`,
  };
}

}