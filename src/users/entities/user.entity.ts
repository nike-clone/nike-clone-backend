import { Gender } from '../types/gender-type';

export class User {
  id: number;

  password: string;

  name: string;

  phoen: string;

  birthOfDate: Date;

  gender: Gender;
}
