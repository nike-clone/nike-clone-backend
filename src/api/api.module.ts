import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { AdminModule } from 'src/admin/admin.module';
import { CategoryModule } from 'src/category/category.module';
import { ProductsModule } from 'src/products/products.module';
import { ApiController } from './api.controller';

@Module({
  // controllers: [ApiController],
  imports: [
    AdminModule,
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
            module: ProductsModule,
          },
        ],
      },
    ]),
  ],
})
export class ApiModule {}
