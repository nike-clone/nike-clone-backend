import { IsArray, IsNumber } from 'class-validator';

export class CreateGoodsItemImageDto {
  @IsArray()
  goodsItemImages: string[];

  @IsArray()
  goodsItemIds: number[];
}
