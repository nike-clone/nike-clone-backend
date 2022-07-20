import { Column, PrimaryGeneratedColumn } from 'typeorm';
import { BannerType } from '../types/banner.type';

export class Banner {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  imagePath: string;

  @Column({ length: 65535 })
  content: string;

  @Column()
  type: BannerType;
}
