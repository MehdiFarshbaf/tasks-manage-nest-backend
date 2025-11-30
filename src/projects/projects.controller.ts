import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  Res,
} from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import ProjectStatusEnum from './enums/projectStatusEnum';
import type { Response } from 'express'; // type-only import

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post()
  async create(
    @Body() createProjectDto: CreateProjectDto,
    @Res() res: Response,
  ) {
    const newProject = await this.projectsService.create(createProjectDto);
    return res.status(HttpStatus.CREATED).json({
      statusCode: HttpStatus.CREATED,
      data: newProject,
      message: 'Project created successfully',
    });
  }

  @Get()
  async findAll(
    @Res() res: Response,
    @Query('status') status?: ProjectStatusEnum,
    @Query('limit') limit: number = 10,
    @Query('page') page: number = 1,
  ) {
    const projects = await this.projectsService.findAll(status, limit, page);

    return res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      data: projects,
      message: 'All projects found',
    });
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res: Response) {
    const project = await this.projectsService.findOne(+id);
    return res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      data: project,
      message: 'Project with id ' + id,
    });
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateProjectDto: UpdateProjectDto,
    @Res() res: Response,
  ) {
    await this.projectsService.update(+id, updateProjectDto);
    return res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      data: null,
      message: 'Project with id ' + id,
    });
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Res() res: Response) {
    await this.projectsService.remove(+id);
    return res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      data: null,
      message: 'Project with id ' + id,
    });
  }
}
