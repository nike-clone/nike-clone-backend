import { Transform } from 'class-transformer';
import { IsEnum, IsNumber, IsOptional, IsString, Min } from 'class-validator';
import { isNumberObject } from 'util/types';
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

  @Transform(({ value }) => {
    if (typeof value === 'string') {
      return [parseInt(value)];
    }
    return value.map((v) => parseInt(v));
  })
  @IsOptional()
  @IsNumber({}, { each: true })
  size: number[];

  @IsOptional()
  @IsString()
  classification: string;

  @Transform(({ value }) => parseInt(value))
  @IsOptional()
  @IsNumber()
  offset: number;

  @Transform(({ value }) => parseInt(value))
  @IsOptional()
  @IsNumber()
  count: number;
}
