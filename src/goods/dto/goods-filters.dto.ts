import { Transform } from 'class-transformer';
import { IsEnum, IsNumber, IsOptional, IsString, Min } from 'class-validator';
import { IsColor } from '../decorators/is-color.decorator';
import { IsGoodsClassification } from '../decorators/is-goods-classification.decorstor';
import { GenderType } from '../types/gender.type';

export class GoodsFiltersDto {
  @IsOptional()
  @IsEnum(GenderType, {
    message: `Gender must be 'Male', 'Female' or 'Unisex'`,
  })
  gender: string;

  @Transform(({ value }) => `#${value}`)
  @IsOptional()
  @IsString()
  colorCode: string;

  @Transform(({ value }) => parseInt(value))
  @IsOptional()
  @IsNumber()
  size: number;

  @IsOptional()
  @IsString()
  classification: string;
}
