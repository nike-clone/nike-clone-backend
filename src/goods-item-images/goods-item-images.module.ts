import { Module } from '@nestjs/common';
import { GoodsItemImagesService } from './goods-item-images.service';
import { GoodsItemImagesController } from './goods-item-images.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GoodsItemImages } from './entities/goods-item-image.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([GoodsItemImages]), AuthModule],
  controllers: [GoodsItemImagesController],
  providers: [GoodsItemImagesService],
  exports: [GoodsItemImagesService],
})
export class GoodsItemImagesModule {}
