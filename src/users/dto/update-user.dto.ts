import { PartialType } from '@nestjs/mapped-types';
import { Gender } from '../types/gender-type';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  password: string;

  passowrdCheck: string;

  name: string;

  birthOfDate: Date;

  gender: Gender;
}
