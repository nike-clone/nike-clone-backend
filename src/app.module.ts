import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

// import { AdminModule } from './admin/admin.module';
import { ProductsModule } from './products/products.module';
import { ApiModule } from './api/api.module';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [ApiModule, ProductsModule],
})
export class AppModule {}
