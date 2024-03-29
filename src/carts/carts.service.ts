import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as _ from 'lodash';
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
    @InjectRepository(User) private usersRepository: Repository<User>,
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

  async findOne(user: User) {
    const cart = await this.cartsRepository.findOne({
      where: { user: { id: user.id } },
      relations: [
        'cartItems.goodsItem.color',
        'cartItems.goodsItem.size',
        'cartItems.goodsItem.goods',
      ],
    });

    const formattedCart = this.formatCart(cart);

    return formattedCart;
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

    const cart = await this.cartsRepository.create({ user });
    const newCart = await this.cartsRepository.save(cart);

    const refreshedCart = await this.cartsRepository.findOne({
      where: { id: newCart.id },
      relations: [
        'cartItems.goodsItem.color',
        'cartItems.goodsItem.size',
        'cartItems.goodsItem.goods',
      ],
    });

    return {
      userId: user.id,
      newCart: refreshedCart,
    };
  }

  private formatCart(cart: Cart) {
    const formattedCart: any = _.cloneDeep(cart);
    const formattedCartItems = [];
    formattedCart.cartItems.forEach((cartItem) => {
      formattedCartItems.push(this.formatCartItem(cartItem));
    });
    formattedCart.cartItems = formattedCartItems;

    return formattedCart;
  }

  private formatCartItem(cartItem: CartItems) {
    const sizeValue = cartItem.goodsItem.size.id;
    const formattedCartItem: any = {
      ...cartItem,
    };
    formattedCartItem.goodsItem['size'] = sizeValue;

    return formattedCartItem;
  }
}
