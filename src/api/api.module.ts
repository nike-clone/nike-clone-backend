import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { AdminModule } from 'src/admin/admin.module';
import { BannersModule } from 'src/banners/banners.module';
import { CategoryModule } from 'src/category/category.module';
import { GoodsClassification } from 'src/goods-classification/entities/goods-classification.entity';
import { GoodsClassificationModule } from 'src/goods-classification/goods-classification.module';
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
    ]),
  ],
})
export class ApiModule {}
