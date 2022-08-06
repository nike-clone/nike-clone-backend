import { Transform } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { IsColorCodeList } from '../decorators/is-colorCode-list.decorator';

import { IsGendersList } from '../decorators/is-genders-list.decorator';

export type Gender = 'Male' | 'Femail' | 'Unisex';

export class GoodsFiltersDto {
  @Transform(({ value }) => {
    if (typeof value === 'string') {
      return [value];
    }
    return value;
  })
  @IsOptional()
  @IsGendersList()
  gender: Gender[];

  @Transform(({ value }) => {
    if (typeof value === 'string') {
      return [`#${value}`];
    }

    return value.map((v) => `#${v}`);
  })
  @IsColorCodeList()
  @IsOptional()
  // @IsString()
  colorCode: string[];

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
