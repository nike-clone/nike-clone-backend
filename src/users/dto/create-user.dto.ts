import { Transform } from 'class-transformer';
import {
  IsDate,
  IsEmail,
  IsString,
  Matches,
  Max,
  MaxLength,
  MinLength,
} from 'class-validator';
import { NotIn } from '../validators/not-in';

type Gender = 'Male' | 'Female';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  @Matches(/^[A-Za-z0-9\d!@#$%^&*]{8,16}$/)
  password: string;

  passwordCheck: string;

  @Transform((params) => params.value.trim())
  @NotIn('password', {
    message: 'password는 name과 같은 문자열을 포함할 수 없습니다.',
  })
  @IsString()
  @MinLength(1)
  @MaxLength(20)
  name: string;

  @IsString()
  @MinLength(5)
  @MaxLength(30)
  phone: string;

  @Transform((params) => new Date(params.value))
  @IsDate()
  birthOfDate: Date;

  gender: Gender;
}
