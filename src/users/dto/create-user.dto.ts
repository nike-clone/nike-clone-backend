type Gender = 'Male' | 'Female';

export class CreateUserDto {
  email: string;

  password: string;

  passwordCheck: string;

  name: string;

  phone: string;

  birthOfDate: Date;

  gender: Gender;
}
