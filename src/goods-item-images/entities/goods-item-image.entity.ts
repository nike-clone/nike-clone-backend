import { GoodsItem } from 'src/goods-items/entities/goods-item.entity';
import { IsColor } from 'src/goods/decorators/is-color.decorator';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class GoodsItemImages {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  goodsName: string;

  @Column()
  @IsColor()
  color: string;

  @Column('simple-array')
  goodsItemImages: string[];

  @OneToMany(() => GoodsItem, (goodsItem) => goodsItem.goodsItemImages)
  goodsItems: GoodsItem[];
}
