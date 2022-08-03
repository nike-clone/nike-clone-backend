import { IsString } from 'class-validator';
import { Goods } from 'src/goods/entities/goods.entity';

export class CreateGoodsClassificationDto {
  @IsString()
  type: string;
}
