import { Module } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { CategoryModule } from 'src/category/category.module';

@Module({
  imports: [CategoryModule],
})
export class AdminModule {}
