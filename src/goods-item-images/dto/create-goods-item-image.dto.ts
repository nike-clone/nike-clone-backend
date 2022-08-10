import { IsArray } from 'class-validator';

export class CreateGoodsItemImageDto {
  @IsArray()
  goodsItemImages: string[];
}
