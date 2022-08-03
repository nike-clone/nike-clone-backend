import { PartialType } from '@nestjs/mapped-types';
import { CreateGoodsClassificationDto } from './create-goods-classification.dto';

export class UpdateGoodsClassificationDto extends PartialType(CreateGoodsClassificationDto) {}
