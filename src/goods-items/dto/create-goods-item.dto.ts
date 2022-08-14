import { IsNumber, Max, Min } from 'class-validator';
import { IsColor } from 'src/goods/decorators/is-color.decorator';
import { IsSize } from 'src/goods/decorators/is-size.decorator';

export class CreateGoodsItemDto {
  @IsNumber()
  goodsItemImagesId: number;

  @IsNumber()
  stock: number;

  @IsColor()
  color: string;

  @IsSize()
  @Min(200)
  @Max(400)
  size: number;

  @IsNumber()
  goodsId: number;
}
