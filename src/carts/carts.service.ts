import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { Cart } from './entities/cart.entity';

@Injectable()
export class CartsService {
  constructor(
    @InjectRepository(Cart) private cartsRepository: Repository<Cart>,
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async create(user: any) {
    const { userId } = user;
    const cartUser = await this.usersRepository.findOne({
      where: { id: userId },
    });

    if (!cartUser) {
      throw new NotFoundException('User not found.');
    }

    const cart = new Cart();
    cart.user = cartUser;
    return this.cartsRepository.save(cart);
  }

  async findCartByUserId(userId: string) {
    const user = await this.usersRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('User not found.');
    }

    const cart = await this.cartsRepository.findOne({
      where: { user },
    });

    if (!cart) {
      throw new NotFoundException('Cart not found.');
    }

    return cart;
  }

  async clearCart(user: any) {
    const oldCart = await this.findCartByUserId(user.userId);
    await this.cartsRepository.remove(oldCart);

    const cartUser = await this.usersRepository.findOne({
      where: { id: user.usrId },
    });
    const newCart = await this.cartsRepository.create({ user: cartUser });
    return this.cartsRepository.save(newCart);
  }

  // async updateCartByUserToken(updateCartDto: UpdateCartDto, user: any) {
  //   console.log(user.userId);
  //   const cart = await this.findCartByUserId(user.userId);

  //   Object.assign(cart, updateCartDto);

  //   const updatedCart = await this.cartsRepository.save(cart);

  //   return updatedCart;
  // }

  remove(id: number) {
    return `This action removes a #${id} cart`;
  }
}
