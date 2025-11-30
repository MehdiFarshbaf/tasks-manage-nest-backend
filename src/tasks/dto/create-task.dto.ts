import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import TaskStatusEnum from '../enums/taskStatus.Enum';

export class CreateTaskDto {
  @IsNotEmpty({ message: 'نام تسک الزامی است.' })
  @IsString({ message: 'نام تسک باید متن باشد.' })
  @MinLength(3, { message: 'نام تسک حداقل باید 3 کاراکتر باشد.' })
  title: string;

  @IsString({ message: 'توضیحات باید متن باشد.' })
  @MinLength(10, { message: 'توضیحات حداقل باید 10 کاراکتر باشد.' })
  @IsOptional()
  description: string;

  @IsEnum(TaskStatusEnum, { message: 'وضعیت نا معتبر است.' })
  @IsOptional()
  status: TaskStatusEnum;
}
