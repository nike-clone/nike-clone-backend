import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ulid } from 'ulid';
import { User } from './entities/user.entity';
import * as uuid from 'uuid';
import { EmailService } from 'src/email/email.service';

import { Connection } from 'typeorm';
import { AuthService } from 'src/auth/auth.service';
import { UserInfo } from './UserInfo';

import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';
import { CreateUserDto } from './dto/create-user.dto';
import { CartsService } from 'src/carts/carts.service';

const scrypt = promisify(_scrypt);

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    private emailService: EmailService,
    private connection: Connection,
    private authService: AuthService,
    @Inject(forwardRef(() => CartsService))
    private cartsService: CartsService,
  ) {}

  async signup(createUserDto: Partial<CreateUserDto>) {
    const { email, password, passwordCheck, name, phone, birthOfDate, gender } =
      createUserDto;
    await this.checkUserExists(email);

    await this.checkPasswordsIdentical(password, passwordCheck);

    const hashedPassword = await this.saltAndHashPassword(password);

    let isTransectionReflected = true;
    let user;
    try {
      await this.connection.transaction(async (manager) => {
        user = new User();
        user.id = ulid();
        user.name = name;
        user.email = email;
        user.password = hashedPassword;
        user.phone = phone;
        user.birthOfDate = birthOfDate;
        user.gender = gender;

        await manager.save(user);
      });
    } catch (e) {
      isTransectionReflected = false;
      console.log(e);
    }

    if (!isTransectionReflected) {
      throw new InternalServerErrorException('User could not be created.');
    }

    await this.cartsService.create(user.id);

    return this.authService.login({
      id: user.id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  }

  async createUser(createUserDto: Partial<CreateUserDto>) {
    const { email, password, passwordCheck, name, phone, birthOfDate, gender } =
      createUserDto;
    await this.checkUserExists(email);

    await this.checkPasswordsIdentical(password, passwordCheck);

    const hashedPassword = await this.saltAndHashPassword(password);

    const signupVerifyToken = uuid.v1();

    let isTransectionReflected = true;
    let user;
    try {
      await this.connection.transaction(async (manager) => {
        user = new User();
        user.id = ulid();
        user.name = name;
        user.email = email;
        user.password = hashedPassword;
        user.phone = phone;
        user.birthOfDate = birthOfDate;
        user.gender = gender;
        user.signupVerifyToken = signupVerifyToken;

        await manager.save(user);
      });
    } catch (e) {
      isTransectionReflected = false;
    }

    if (!isTransectionReflected) {
      throw new InternalServerErrorException('User could not be created.');
    }

    await this.sendMemberJoinEmail(email, signupVerifyToken);

    return {
      message: 'User successfully created.',
      data: {
        email: user.email,
      },
    };
  }

  // async verifyEmail(signupVerifyToken: string) {
  //   const user = await this.usersRepository.findOne({ signupVerifyToken });

  //   if (!user) {
  //     throw new NotFoundException('유저가 존재하지 않습니다.');
  //   }

  //   if (user.status !== 'Proceeding') {
  //     throw new NotAcceptableException('유효하지 않은 요청입니다.');
  //   }

  //   user.status = 'Activated';

  //   await this.usersRepository.save(user);

  //   return;
  // }

  async login(email: string, password: string): Promise<string> {
    const user = await this.usersRepository.findOne({ where: { email } });

    if (!user) {
      throw new BadRequestException('Wrong ID or Password.');
    }

    await this.checkPasswordValidity(password, user.password);

    return this.authService.login({
      id: user.id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  }

  async getUserInfo(userId: string): Promise<UserInfo> {
    const user = await this.usersRepository.findOne({ where: { id: userId } });

    if (!user) {
      throw new NotFoundException('유저가 존재하지 않습니다.');
    }

    return {
      id: user.id,
      name: user.name,
      email: user.email,
    };
  }

  async findUserById(id: string) {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('user not found.');
    }

    return user;
  }

  // TODO : User update 구현
  // update(id: number, updateUserDto: UpdateUserDto) {
  //   return `This action updates a #${id} user`;
  // }

  // TODO : User delete 구현
  // remove(id: number) {
  //   return `This action removes a #${id} user`;
  // }

  private async checkUserExists(email: string) {
    const user = await this.usersRepository.findOne({ where: { email } });
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

  private async sendMemberJoinEmail(email: string, signupVerifyToken: string) {
    await this.emailService.sendMemberJoinVerification(
      email,
      signupVerifyToken,
    );
  }

  private async saltAndHashPassword(password) {
    const salt = randomBytes(8).toString('hex');
    const hash = (await scrypt(password, salt, 32)) as Buffer;
    const hashedPassword = `${salt}.${hash.toString('hex')}`;
    return hashedPassword;
  }

  private async checkPasswordValidity(
    password: string,
    storedPassword: string,
  ) {
    const [salt, storedHash] = storedPassword.split('.');
    const hash = (await scrypt(password, salt, 32)) as Buffer;
    if (storedHash !== hash.toString('hex')) {
      throw new BadRequestException('Wrong ID or Password.');
    }
    return;
  }
}
