import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CartsService } from 'src/carts/carts.service';
import { Goods } from 'src/goods/entities/goods.entity';
import { GoodsService } from 'src/goods/goods.service';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateCartItemDto } from './dto/create-cart-item.dto';
import { UpdateCartItemDto } from './dto/update-cart-item.dto';
import { CartItems } from './entities/cart-item.entity';

@Injectable()
export class CartItemsService {
  constructor(
    @InjectRepository(CartItems)
    private cartItemsRepository: Repository<CartItems>,
    private cartsService: CartsService,
    private goodsService: GoodsService,
  ) {}

  async createCartItem(createCartItemDto: CreateCartItemDto, user: any) {
    const { quantity, goodsId } = createCartItemDto;

    const cart = await this.cartsService.findCartByUserId(user.userId);
    if (!cart) {
      throw new NotFoundException('Wrong user id.');
    }

    const isGoodsInCart = await this.isGoodsInCart(goodsId);

    if (isGoodsInCart) {
      // cart item already exists
      const cartItem = await this.cartItemsRepository.findOne({
        where: { goods: { id: goodsId } },
      });
      cartItem.quantity += quantity;

      await this.cartItemsRepository.save(cartItem);
    } else {
      // adding new goods to the cart
      const goods = await this.goodsService.findOne(goodsId);
      if (!goods) {
        throw new NotFoundException('Wrong goods id.');
      }

      const cartItem = await this.cartItemsRepository.create({
        quantity,
        goods,
        cart,
      });

      await this.cartItemsRepository.save(cartItem);
    }

    return {
      message: 'The goods was added to the cart.',
    };
  }

  async findAllCartItems(cartId: number) {
    const cartItems = await this.cartItemsRepository.find({
      where: { cart: { id: cartId } },
      relations: ['goods'],
    });

    return cartItems;
  }

  findOne(id: number) {
    return `This action returns a #${id} cartItem`;
  }

  async updateCartItem(
    id: number,
    updateCartItemDto: UpdateCartItemDto,
    user: any,
  ) {
    const cartItem = await this.cartItemsRepository.findOne({
      where: { id },
      relations: ['cart.user'],
    });
    if (!cartItem) {
      throw new NotFoundException('Cart item not foud.');
    }

    const requestedUserId = user.userId;
    const cartUserId = cartItem.cart.user.id;

    console.log(requestedUserId, cartUserId);
    if (requestedUserId !== cartUserId) {
      throw new UnauthorizedException();
    }

    Object.assign(cartItem, updateCartItemDto);

    const updatedCartItem = await this.cartItemsRepository.save(cartItem);

    return {
      message: `The cart item(id: ${id}) was successfully updated.`,
      data: updatedCartItem,
    };
  }

  remove(id: number) {
    return `This action removes a #${id} cartItem`;
  }

  async isGoodsInCart(goodsId: number) {
    const cartItemList = await this.cartItemsRepository.find({
      where: { goods: { id: goodsId } },
    });
    console.log(cartItemList);
    return cartItemList.length > 0;
  }

  async calculateTotalPrice(cartId: number): Promise<number> {
    const items: CartItems[] = await this.findAllCartItems(cartId);

    let total = 0;
    items.forEach((item) => {
      total += item.goods.price * item.quantity;
    });
    return total;
  }
}
