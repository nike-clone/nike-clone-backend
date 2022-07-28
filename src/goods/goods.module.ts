import { Module } from '@nestjs/common';
import { GoodsService } from './goods.service';
import { GoodsController } from './goods.controller';
import { Goods } from './entities/goods.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Gender } from './entities/genders.entity';
import { Color } from './entities/colors.entity';
import { Size } from './entities/sizes.entity';
import { IsColorConstraint } from './decorators/is-color.decorator';
import { AuthService } from 'src/auth/auth.service';
import { CartItems } from 'src/cart-items/entities/cart-item.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Goods, Gender, Color, Size, CartItems])],
  controllers: [GoodsController],
  providers: [GoodsService, AuthService, IsColorConstraint],
})
export class GoodsModule {}
