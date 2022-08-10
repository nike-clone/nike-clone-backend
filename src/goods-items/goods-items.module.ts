import { Module } from '@nestjs/common';
import { GoodsItemsService } from './goods-items.service';
import { GoodsItemsController } from './goods-items.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GoodsItem } from './entities/goods-item.entity';
import { Color } from 'src/goods/entities/colors.entity';
import { Size } from 'src/goods/entities/sizes.entity';
import { AdminModule } from 'src/admin/admin.module';
import { AuthModule } from 'src/auth/auth.module';
import { GoodsModule } from 'src/goods/goods.module';
import { GoodsItemImagesModule } from 'src/goods-item-images/goods-item-images.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([GoodsItem, Color, Size]),
    AdminModule,
    AuthModule,
    GoodsModule,
    GoodsItemImagesModule,
  ],
  controllers: [GoodsItemsController],
  providers: [GoodsItemsService],
  exports: [GoodsItemsService],
})
export class GoodsItemsModule {}
