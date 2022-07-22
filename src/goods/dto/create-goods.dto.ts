import { IsEnum, IsNumber, IsString, Max, Min } from 'class-validator';
import { IsSize } from '../decorators/is-size.decorator';
import { GenderType } from '../types/gender.type';

export class CreateGoodsDto {
  @IsString()
  name: string;

  @IsNumber()
  price: number;

  @IsString()
  imagePath: string;

  @IsEnum(GenderType, {
    message: `Gender must be 'Male', 'Female' or 'Unisex'.`,
  })
  gender: string;

  @IsString()
  color: string;

  @IsNumber()
  @Min(220)
  @Max(380)
  @IsSize()
  size: number;
}
