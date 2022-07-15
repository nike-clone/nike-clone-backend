import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Gender } from '../types/gender-type';

@Entity('User')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 60 })
  email: string;

  @Column({ length: 30 })
  password: string;

  @Column({ length: 30 })
  name: string;

  @Column({ length: 20 })
  phone: string;

  @Column()
  birthOfDate: Date;

  @Column()
  gender: Gender;

  @Column({ default: false })
  isAdmin: boolean;
}
