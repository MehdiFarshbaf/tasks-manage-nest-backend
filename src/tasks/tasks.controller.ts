import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Res,
  HttpStatus,
  Query,
  Put,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import type { Response } from 'express';
import TaskStatusEnum from './enums/taskStatus.Enum';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  async create(@Body() createTaskDto: CreateTaskDto, @Res() res: Response) {
    const newTask = await this.tasksService.create(createTaskDto);
    res.status(HttpStatus.CREATED).json({
      statusCode: HttpStatus.CREATED,
      data: newTask,
      message: 'Task created successfully',
    });
  }

  @Get()
  async findAll(
    @Res() res: Response,
    @Query('status') status?: TaskStatusEnum,
    @Query('limit') limit: number = 10,
    @Query('page') page: number = 1,
  ) {
    const tasks = await this.tasksService.findAll(status, limit, page);
    res.status(HttpStatus.CREATED).json({
      statusCode: HttpStatus.OK,
      data: tasks,
      message: 'Tasks found',
    });
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res: Response) {
    const task = await this.tasksService.findOne(+id);

    res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      data: task,
      message: 'Task found',
    });
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto,
    @Res() res: Response,
  ) {
    await this.tasksService.update(+id, updateTaskDto);
    res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      data: null,
      message: 'Task updated successfully',
    });
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Res() res: Response) {
    await this.tasksService.remove(+id);
    res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      data: null,
      message: 'Task deleted successfully',
    });
  }
}
