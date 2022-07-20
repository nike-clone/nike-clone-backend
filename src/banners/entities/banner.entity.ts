import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BannerType } from '../types/banner.type';

@Entity('Banner')
export class Banner {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  imagePath: string;

  @Column('text')
  content: string;

  @Column()
  type: BannerType;
}
