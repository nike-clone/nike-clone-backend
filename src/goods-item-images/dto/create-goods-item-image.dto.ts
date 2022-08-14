import { IsArray, IsString } from 'class-validator';
import { IsColor } from 'src/goods/decorators/is-color.decorator';

export class CreateGoodsItemImageDto {
  @IsArray()
  goodsItemImages: string[];

  @IsColor()
  color: string;

  @IsString()
  goodsName: string;
}
