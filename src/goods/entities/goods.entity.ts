import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  RelationId,
} from 'typeorm';
import { Color } from './colors.entity';
import { Gender } from './genders.eitity';
import { Size } from './sizes.entity';

@Entity()
export class Goods {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  price: number;

  @Column()
  imagePath: string;

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
