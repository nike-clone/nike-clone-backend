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
import { GoodsClassification } from 'src/goods-classification/entities/goods-classification.entity';
import { IsGoodsClassificationConstraint } from './decorators/is-goods-classification.decorstor';
import { IsColorCodeListConstraint } from './decorators/is-colorCode-list.decorator';

@Module({
  imports: [
    TypeOrmModule.forFeature([Goods, Gender, Color, Size, GoodsClassification]),
  ],
  controllers: [GoodsController],
  providers: [
    GoodsService,
    AuthService,
    IsColorConstraint,
    IsGoodsClassificationConstraint,
    IsColorCodeListConstraint,
  ],
})
export class GoodsModule {}
