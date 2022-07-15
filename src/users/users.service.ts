import { Injectable, NotAcceptableException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { stringify } from 'querystring';
import { Repository } from 'typeorm';
import { ulid } from 'ulid';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Gender } from './types/gender-type';
import * as uuid from 'uuid';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async createUser(
    email: string,
    password: string,
    passwordCheck: string,
    name: string,
    phone: string,
    birthOfDate: Date,
    gender: Gender,
  ) {
    await this.checkUserExists(email);

    await this.checkPasswordsIdentical(password, passwordCheck);

    const signupVerifyToken = uuid.v1();

    const user = new User();
    user.id = ulid();
    user.name = name;
    user.email = email;
    user.password = password;
    user.phone = phone;
    user.birthOfDate = birthOfDate;
    user.gender = gender;
    user.signupVerifyToken = signupVerifyToken;

    await this.usersRepository.save(user);

    return {
      message: 'User successfully created.',
      data: user,
    };
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  private async checkUserExists(email: string) {
    const user = await this.usersRepository.findOne({ email });
    if (user) {
      throw new NotAcceptableException('User already exists.');
    }
  }

  private async checkPasswordsIdentical(password, passwordCheck) {
    if (password !== passwordCheck) {
      throw new NotAcceptableException(
        'Password and passwordCheck do not match.',
      );
    }
  }
}
