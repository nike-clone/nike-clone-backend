import { Module } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { CategoryModule } from 'src/category/category.module';
import { ProductsModule } from 'src/products/products.module';

@Module({
  imports: [CategoryModule, ProductsModule],
})
export class AdminModule {}
