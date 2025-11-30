import ProjectStatusEnum from '../enums/projectStatusEnum';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateProjectDto {
  @IsNotEmpty({ message: 'نام پروژه الزامی است.' })
  @IsString({ message: 'نام پروژه باید متنی باشد.' })
  name: string;

  @IsString()
  @IsEnum(ProjectStatusEnum, {
    message: 'وضعیت پروژه باید یکی از مقادیر enabled یا disabled باشد.',
  })
  @IsOptional()
  status: ProjectStatusEnum;
}
