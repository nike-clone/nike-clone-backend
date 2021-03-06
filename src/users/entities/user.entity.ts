import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import { Gender } from '../types/gender.type';
// import { UserStatus } from '../types/user-status.type';

@Entity('User')
export class User {
  @PrimaryColumn()
  id: string;

  @Column({ length: 60 })
  email: string;

  @Column()
  password: string;

  @Column({ length: 30 })
  name: string;

  @Column({ length: 20 })
  phone: string;

  @Column()
  birthOfDate: Date;

  @Column()
  gender: Gender;

  // @Column()
  // signupVerifyToken: string;

  // @Column({ default: 'Proceeding' })
  // status: UserStatus;

  @Column({ default: false })
  isAdmin: boolean;
}
