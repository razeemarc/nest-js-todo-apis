import {
    Body,
    Controller,
    Get,
    Post,
    Patch,
    Param,
    ParseIntPipe
} from '@nestjs/common';
import { UpdateTaskDto } from './dto/update-task.dto'

import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import type { Task } from './interfaces/task.interface';

@Controller('tasks')
export class TasksController {

    constructor(
        private readonly tasksService: TasksService,
    ) { }

    @Post()
    create(@Body() createTaskDto: CreateTaskDto) {

        return this.tasksService.create(createTaskDto);
    }

    @Get()
    findAll(): Task[] {
        return this.tasksService.findAll();
    }

    @Patch(':id')
    update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateTaskDto: UpdateTaskDto,
    ): Task {
        return this.tasksService.update(id, updateTaskDto);
    }

    @Get(':id')
findOne(
  @Param('id', ParseIntPipe) id: number,
): Task {
  return this.tasksService.findOne(id);
}
}