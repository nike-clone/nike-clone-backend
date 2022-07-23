import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { AdminModule } from 'src/admin/admin.module';
import { BannersModule } from 'src/banners/banners.module';
import { CategoryModule } from 'src/category/category.module';
import { GoodsModule } from 'src/goods/goods.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  // controllers: [ApiController],
  imports: [
    AdminModule,
    UsersModule,
    BannersModule,
    GoodsModule,
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
    ]),
  ],
})
export class ApiModule {}
