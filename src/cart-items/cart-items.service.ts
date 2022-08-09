import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CartsService } from 'src/carts/carts.service';
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

    const cart = await this.cartsService.findCartByUserId(user.id);
    if (!cart) {
      throw new NotFoundException('Wrong user id.');
    }

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

    return this.cartItemsRepository.findOne({
      where: { id: cartItem.id },
      relations: ['goods', 'cart'],
    });
  }

  findAll() {
    return `This action returns all cartItems`;
  }

  findOne(id: number) {
    return `This action returns a #${id} cartItem`;
  }

  async updateCartItem(id: number, updateCartItemDto: UpdateCartItemDto) {
    const cartItem = await this.cartItemsRepository.findOne({ where: { id } });
    if (!cartItem) {
      throw new NotFoundException('Cart item not foud.');
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
}
