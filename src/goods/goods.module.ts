import { Module } from '@nestjs/common';
import { GoodsService } from './goods.service';
import { GoodsController } from './goods.controller';
import { Goods } from './entities/goods.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Gender } from './entities/genders.eitity';
import { Color } from './entities/colors.entity';
import { Size } from './entities/sizes.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Goods, Gender, Color, Size])],
  controllers: [GoodsController],
  providers: [GoodsService],
})
export class GoodsModule {}
