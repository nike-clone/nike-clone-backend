import { Module } from '@nestjs/common';
import { GoodsItemImagesService } from './goods-item-images.service';
import { GoodsItemImagesController } from './goods-item-images.controller';

@Module({
  controllers: [GoodsItemImagesController],
  providers: [GoodsItemImagesService]
})
export class GoodsItemImagesModule {}
