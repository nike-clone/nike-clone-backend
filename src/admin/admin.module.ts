import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { RouterModule } from '@nestjs/core';
import { CategoryModule } from 'src/category/category.module';
import { CategoryController } from 'src/category/category.controller';
import { CategoryService } from 'src/category/category.service';
import { ProductsModule } from 'src/products/products.module';

@Module({
  // controllers: [AdminController],
  // providers: [AdminService],
  imports: [CategoryModule, ProductsModule],
})
export class AdminModule {}
