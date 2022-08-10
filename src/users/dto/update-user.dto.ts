import { PartialType } from '@nestjs/mapped-types';
import { Transform } from 'class-transformer';
import { IsDate, IsString, Matches } from 'class-validator';
import { IsGender } from '../decorators/is-gender.decorator';
import { Gender } from '../types/gender.type';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsString()
  @Matches(/^[A-Za-z0-9\d!@#$%^&*]{8,16}$/)
  password: string;

  @IsString()
  passowrdCheck: string;

  @IsString()
  name: string;

  @Transform((params) => new Date(params.value))
  @IsDate()
  birthOfDate: Date;

  @IsGender()
  gender: Gender;
}
