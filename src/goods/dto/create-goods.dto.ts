import { IsEnum, IsNumber, IsString, Max, Min } from 'class-validator';
import { GenderType } from '../types/gender.type';

export class CreateGoodsDto {
  @IsString()
  name: string;

  @IsNumber()
  price: number;

  @IsString()
  imagePath: string;

  @IsEnum(GenderType, { message: `Gender must be either 'Male' or 'Female'.` })
  gender: string;

  @IsString()
  color: string;

  @IsNumber()
  @Min(220)
  @Max(380)
  size: number;
}
