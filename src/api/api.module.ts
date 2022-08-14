import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { AdminModule } from 'src/admin/admin.module';
import { BannersModule } from 'src/banners/banners.module';
import { CategoryModule } from 'src/category/category.module';
import { GoodsClassificationModule } from 'src/goods-classification/goods-classification.module';
import { GoodsItemImagesModule } from 'src/goods-item-images/goods-item-images.module';
import { GoodsItemsModule } from 'src/goods-items/goods-items.module';
import { GoodsModule } from 'src/goods/goods.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  // controllers: [ApiController],
  imports: [
    AdminModule,
    UsersModule,
    BannersModule,
    GoodsModule,
    GoodsClassificationModule,
    GoodsItemsModule,
    GoodsItemImagesModule,
    RouterModule.register([
      {
        path: 'api',
        module: AdminModule,
        children: [
          {
            path: 'admin',
            module: CategoryModule,
          },
          {
            path: 'admin',
            module: BannersModule,
          },
        ],
      },
      {
        path: 'api',
        module: UsersModule,
      },
      {
        path: 'api',
        module: GoodsModule,
      },
      {
        path: 'api',
        module: GoodsClassificationModule,
      },
      {
        path: 'api',
        module: GoodsItemsModule,
      },
      {
        path: 'api',
        module: GoodsItemImagesModule,
      },
    ]),
  ],
})
export class ApiModule {}
