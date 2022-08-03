import { Module } from '@nestjs/common';
import { GoodsClassificationService } from './goods-classification.service';
import { GoodsClassificationController } from './goods-classification.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Goods } from 'src/goods/entities/goods.entity';
import { GoodsClassification } from './entities/goods-classification.entity';

@Module({
  imports: [TypeOrmModule.forFeature([GoodsClassification, Goods])],
  controllers: [GoodsClassificationController],
  providers: [GoodsClassificationService],
})
export class GoodsClassificationModule {}
