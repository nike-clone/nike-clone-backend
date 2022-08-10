import { PartialType } from '@nestjs/mapped-types';
import { CreateGoodsItemImageDto } from './create-goods-item-image.dto';

export class UpdateGoodsItemImageDto extends PartialType(CreateGoodsItemImageDto) {}
