import { cp } from 'fs';
import { GoodsClassification } from '../../goods-classification/entities/goods-classification.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Gender } from './genders.entity';
import { GoodsItem } from '../../goods-items/entities/goods-item.entity';

@Entity()
export class Goods {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  price: number;

  @Column({ default: null })
  salePrice: number;

  @Column({ default: null })
  salePercentage: number;

  @Column()
  productImagePrimary: string;

  @Column('simple-array')
  productImageExtra: string[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @ManyToOne(
    () => GoodsClassification,
    (classification) => classification.goods,
  )
  @JoinColumn()
  classification: GoodsClassification;

  @ManyToOne(() => Gender, (gender) => gender.goods)
  @JoinColumn()
  gender: Gender;

  @OneToMany(() => GoodsItem, (goodsItem) => goodsItem.goods)
  goodsItems: GoodsItem[];
}
