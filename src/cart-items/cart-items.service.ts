import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CartsService } from 'src/carts/carts.service';
import { GoodsService } from 'src/goods/goods.service';
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

  async createCartItem(createCartItemDto: CreateCartItemDto) {
    const { quantity, goodsId, userId } = createCartItemDto;

    const cart = await this.cartsService.findCartByUserId(userId);
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

    return this.cartItemsRepository.save(cartItem);
  }

  findAll() {
    return `This action returns all cartItems`;
  }

  findOne(id: number) {
    return `This action returns a #${id} cartItem`;
  }

  update(id: number, updateCartItemDto: UpdateCartItemDto) {
    return `This action updates a #${id} cartItem`;
  }

  remove(id: number) {
    return `This action removes a #${id} cartItem`;
  }
}
