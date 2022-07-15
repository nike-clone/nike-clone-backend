import { Injectable, NotAcceptableException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async createUser(
    name: string,
    email: string,
    password: string,
    passwordCheck: string,
  ) {
    await this.checkUserExists(email);

    await this.checkPasswordsIdentical(password, passwordCheck);

    return 'This action adds a new user';
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
    return false;
  }
  private async checkPasswordsIdentical(password, passwordCheck) {
    if (password !== passwordCheck) {
      throw new NotAcceptableException(
        'Password and passwordCheck do not match.',
      );
    }
  }
}
