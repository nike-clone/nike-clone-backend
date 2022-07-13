import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

// import { AdminModule } from './admin/admin.module';
import { ProductsModule } from './products/products.module';
import { ApiModule } from './api/api.module';
import { CategoryModule } from './category/category.module';
import { AdminModule } from './admin/admin.module';
import { ApiController } from './api/api.controller';
import { RouterModule } from '@nestjs/core';
// import { AdminModule } from './admin/admin.module';

@Module({
  // imports: [AdminModule],
  controllers: [AppController],
  providers: [AppService],
  imports: [ApiModule, ProductsModule],
})
export class AppModule {}
