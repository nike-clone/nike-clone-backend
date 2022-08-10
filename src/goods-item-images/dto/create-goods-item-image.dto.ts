import { IsArray } from 'class-validator';
import { OneToMany } from 'typeorm';

export class CreateGoodsItemImageDto {
  @IsArray()
  goodsItemImages: string[];
}
