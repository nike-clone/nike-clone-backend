import { GoodsItem } from 'src/goods-items/entities/goods-item.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class GoodsItemImages {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('simple-array')
  goodsItemImages: string[];

  @OneToMany(() => GoodsItem, (goodsItem) => goodsItem.goodsItemImages)
  goodsItems: GoodsItem[];
}
