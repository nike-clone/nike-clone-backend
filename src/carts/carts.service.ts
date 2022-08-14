import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CartItems } from 'src/cart-items/entities/cart-item.entity';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { In, Repository } from 'typeorm';
import { Cart } from './entities/cart.entity';

@Injectable()
export class CartsService {
  constructor(
    @InjectRepository(Cart) private cartsRepository: Repository<Cart>,
    @InjectRepository(CartItems)
    private CartItemsRepository: Repository<CartItems>,
    @Inject(forwardRef(() => UsersService))
    private usersService: UsersService,
  ) {}

  async create(user: User) {
    const cartUser = await this.usersService.findUserById(user.id);

    const cart = await this.cartsRepository.create({
      user: cartUser,
    });

    return this.cartsRepository.save(cart);
  }

  async findCartByUserId(userId: string) {
    const user = await this.usersService.findUserCart(userId);
    return user.cart;
  }

  async clearCart(user: User) {
    const oldCart = await this.cartsRepository.findOne({
      where: { user: { id: user.id } },
      relations: ['user', 'cartItems'],
    });

    // delete all cart items of oldCart
    const oldCartItemIds = [];
    oldCart.cartItems.forEach((item) => {
      oldCartItemIds.push(item.id);
    });
    await this.CartItemsRepository.delete({ id: In(oldCartItemIds) });

    await this.cartsRepository.remove(oldCart);

    const newCart = await this.cartsRepository.create({ user });
    return this.cartsRepository.save(newCart);
  }

  // async updateCartByUserToken(updateCartDto: UpdateCartDto, user: any) {
  //   console.log(user.userId);
  //   const cart = await this.findCartByUserId(user.userId);

  //   Object.assign(cart, updateCartDto);

  //   const updatedCart = await this.cartsRepository.save(cart);

  //   return updatedCart;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} cart`;
  // }
}
