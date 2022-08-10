import { GoodsItemImages } from 'src/goods-item-images/entities/goods-item-image.entity';
import { Color } from 'src/goods/entities/colors.entity';
import { Goods } from 'src/goods/entities/goods.entity';
import { Size } from 'src/goods/entities/sizes.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class GoodsItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: 10 })
  stock: number;

  @ManyToOne(() => Color, (color) => color.goodsItems)
  color: Color;

  @ManyToOne(() => Size, (size) => size.goodsItems)
  size: Size;

  @ManyToOne(() => Goods, (goods) => goods.goodsItems)
  goods: Goods;

  @ManyToOne(
    () => GoodsItemImages,
    (goodsItemImages) => goodsItemImages.goodsItems,
  )
  goodsItemImages: GoodsItemImages;
}
