import { cp } from 'fs';
import { GoodsClassification } from '../../goods-classification/entities/goods-classification.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  RelationId,
} from 'typeorm';
import { Color } from './colors.entity';
import { Gender } from './genders.entity';
import { Size } from './sizes.entity';

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
  imagePath: string;

  @Column({ default: 10 })
  stock: number;

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

  @ManyToOne(() => Color, (color) => color.goods)
  @JoinColumn()
  color: Color;

  @ManyToOne(() => Size, (size) => size.goods)
  @JoinColumn()
  size: Size;
}
