import {
  Injectable,
  NotAcceptableException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CartsService } from 'src/carts/carts.service';
import { Cart } from 'src/carts/entities/cart.entity';
import { GoodsItemsService } from 'src/goods-items/goods-items.service';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateCartItemDto } from './dto/create-cart-item.dto';
import { UpdateCartItemDto } from './dto/update-cart-item.dto';
import { CartItems } from './entities/cart-item.entity';
import * as _ from 'lodash';

@Injectable()
export class CartItemsService {
  constructor(
    @InjectRepository(CartItems)
    private cartItemsRepository: Repository<CartItems>,
    @InjectRepository(Cart) private cartsRepository: Repository<Cart>,
    private cartsService: CartsService,
    private goodsItemsService: GoodsItemsService,
  ) {}

  async createCartItem(createCartItemDto: CreateCartItemDto, user: User) {
    const { goodsId, size, colorId, quantity } = createCartItemDto;
    const cart = await this.cartsRepository.findOne({
      where: { user: { id: user.id } },
      relations: ['cartItems.goodsItem'],
    });

    const goodsItem = await this.goodsItemsService.findOneByProperties(
      goodsId,
      size,
      colorId,
    );

    // check goodsItem aleady exists in the cart
    cart.cartItems.forEach((cartItem) => {
      if (cartItem.goodsItem && cartItem.goodsItem.id === goodsItem.id) {
        throw new NotAcceptableException(
          `The goodsItem (id: ${cartItem.goodsItem.id}) already exists in the cart. Use "PATCH" method instead.`,
        );
      }
    });

    const cartItem = await this.cartItemsRepository.create({
      cart,
      goodsItem,
      quantity,
    });
    const savedCartItem = await this.cartItemsRepository.save(cartItem);

    const retrievedCartItem = await this.cartItemsRepository.findOne({
      where: { id: savedCartItem.id },
      relations: [
        'cart',
        'goodsItem.color',
        'goodsItem.size',
        'goodsItem.goods',
        'goodsItem.goodsItemImages',
      ],
    });

    const formattedCartItem = this.formatCartItem(retrievedCartItem);
    delete formattedCartItem.cart.cartItems;
    return formattedCartItem;
  }

  async findAllCartItems(user: User) {
    const cart = await this.cartsRepository.findOne({
      where: { user: { id: user.id } },
    });

    const cartItems = await this.cartItemsRepository.find({
      where: { cart: { id: cart.id } },
      relations: ['goodsItem.color', 'goodsItem.size', 'goodsItem.goods'],
    });

    const formattedCartItemList = [];
    cartItems.forEach((cartItem) => {
      formattedCartItemList.push(this.formatCartItem(cartItem));
    });

    return formattedCartItemList;
  }

  async updateCartItem(
    cartItemId: number,
    updateCartItemDto: UpdateCartItemDto,
    user: User,
  ) {
    const cartItem = await this.cartItemsRepository.findOne({
      where: { id: cartItemId },
      relations: ['cart.user', 'goodsItem'],
    });

    if (!cartItem) {
      throw new NotFoundException('CartItem not found.');
    }

    // check if the user is the owner of the cart
    this.validateCartOwner(cartItem, user);

    if (!this.checkStockIsAvailable(updateCartItemDto.quantity, cartItem)) {
      throw new NotAcceptableException(
        `Cannot set quantity greater than stock(current stock: ${cartItem.goodsItem.stock})`,
      );
    }

    cartItem.quantity = updateCartItemDto.quantity;

    const upadtedCartItem = await this.cartItemsRepository.save(cartItem);

    // return upadtedCartItem;
    return {
      message: `CartItem(id: ${cartItem.id}) was updated.`,
      updatedCartItem: {
        id: upadtedCartItem.id,
        quantity: upadtedCartItem.quantity,
      },
    };
  }

  async remove(id: number, user: User) {
    const cartItem = await this.cartItemsRepository.findOne({
      where: { id },
      relations: ['cart.user'],
    });

    if (!cartItem) {
      throw new NotFoundException('CartItem not found.');
    }

    // check if the user is the owner of the cart
    this.validateCartOwner(cartItem, user);

    const deletedCartItem = await this.cartItemsRepository.remove(cartItem);

    delete deletedCartItem.cart.user;

    return {
      message: `CartItem (id: ${id}) was deleted.`,
      deletedCartItem,
    };
  }

  private validateCartOwner(cartItem: CartItems, user: User) {
    if (cartItem.cart.user.id !== user.id) {
      throw new UnauthorizedException();
    }
  }

  private checkStockIsAvailable(quantity: number, cartItem: CartItems) {
    return quantity <= cartItem.goodsItem.stock;
  }

  private formatCartItem(cartItem: CartItems) {
    const sizeValue = cartItem.goodsItem.size.id;
    const formattedCartItem: any = _.cloneDeep(cartItem);
    formattedCartItem.goodsItem['size'] = sizeValue;
    delete formattedCartItem.cartItems;

    return formattedCartItem;
  }
}
