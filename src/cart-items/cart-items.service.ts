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
import { GoodsItem } from 'src/goods-items/entities/goods-item.entity';
import { AnonymousCartService } from 'src/anonymous-cart/anonymous-cart.service';
import { AnonymousCart } from 'src/anonymous-cart/entities/anonymous-cart.entity';

enum CART_TYPE {
  CART = 'cart',
  ANONYMOUS_CART = 'anonymousCart',
}

@Injectable()
export class CartItemsService {
  constructor(
    @InjectRepository(CartItems)
    private cartItemsRepository: Repository<CartItems>,
    @InjectRepository(Cart) private cartsRepository: Repository<Cart>,
    private cartsService: CartsService,
    private goodsItemsService: GoodsItemsService,
    private anonymousCartService: AnonymousCartService,
  ) {}

  async createCartItem(
    createCartItemDto: CreateCartItemDto,
    user: User,
    anonymous_id: string,
  ) {
    //get a goodsItem
    const { goodsId, size, colorId, quantity } = createCartItemDto;

    const goodsItem = await this.goodsItemsService.findOneByProperties(
      goodsId,
      size,
      colorId,
    );

    let cart: Cart | AnonymousCart;

    if (anonymous_id) {
      cart = await this.anonymousCartService.findOne(anonymous_id);
      if (!cart) {
        cart = await this.anonymousCartService.create({ id: anonymous_id });
      }

      // check goodsItem aleady exists in the cart
      this.checkCartItemDuplication(cart, goodsItem);

      const cartItem = await this.cartItemsRepository.create({
        anonymousCart: cart,
        goodsItem,
        quantity,
      });

      const formattedCartItem = await this.saveAndGetFormattedCartItem(
        cartItem,
        CART_TYPE.ANONYMOUS_CART,
      );

      delete formattedCartItem.anonymousCart.cartItems;
      return formattedCartItem;
    } else {
      cart = await this.cartsRepository.findOne({
        where: { user: { id: user.id } },
        relations: ['cartItems.goodsItem'],
      });

      // check goodsItem aleady exists in the cart
      this.checkCartItemDuplication(cart, goodsItem);

      const cartItem = await this.cartItemsRepository.create({
        cart,
        goodsItem,
        quantity,
      });

      const formattedCartItem = await this.saveAndGetFormattedCartItem(
        cartItem,
        CART_TYPE.CART,
      );

      delete formattedCartItem.cart.cartItems;
      return formattedCartItem;
    }
  }

  async findAllCartItems(user: User, anonymous_id: string) {
    let cart: Cart | AnonymousCart;
    let query;

    if (anonymous_id) {
      cart = await this.anonymousCartService.findOne(anonymous_id);

      if (!cart) {
        cart = await this.anonymousCartService.create({ id: anonymous_id });
      }
      query = {
        anonymousCart: {
          id: cart.id,
        },
      };
    } else {
      cart = await this.cartsRepository.findOne({
        where: { user: { id: user.id } },
      });

      query = {
        cart: {
          id: cart.id,
        },
      };
    }

    const cartItems = await this.cartItemsRepository.find({
      where: query,
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
    anonymous_id: string,
    user: User,
  ) {
    const relations = ['goodsItem.goods', 'goodsItem.size', 'goodsItem.color'];
    if (anonymous_id) {
      relations.push('anonymousCart');
    } else {
      relations.push('cart.user');
    }

    const cartItem = await this.cartItemsRepository.findOne({
      where: { id: cartItemId },
      relations,
    });

    if (!cartItem) {
      throw new NotFoundException('CartItem not found.');
    }

    //find to-be-saved in cart-items goods-item
    const newGoodsItem = await this.goodsItemsService.findOneByProperties(
      cartItem.goodsItem.goods.id,
      updateCartItemDto.size,
      updateCartItemDto.colorId,
    );

    if (!this.checkStockIsAvailable(updateCartItemDto.quantity, newGoodsItem)) {
      throw new NotAcceptableException(
        `Cannot set quantity greater than stock(current stock: ${cartItem.goodsItem.stock})`,
      );
    }

    cartItem.quantity = updateCartItemDto.quantity;
    cartItem.goodsItem = newGoodsItem;

    await this.cartItemsRepository.save(cartItem);

    const savedCartItem = await this.cartItemsRepository.findOne({
      where: { id: cartItem.id },
      relations,
    });

    // size object -> size value 로 formatting
    const sizeValue = savedCartItem.goodsItem.size.id;
    const formattedCartItem = _.cloneDeep(savedCartItem) as any;
    formattedCartItem.goodsItem.size = sizeValue;

    return {
      message: `CartItem(id: ${cartItem.id}) was updated.`,
      updatedCartItem: formattedCartItem,
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

    const deletedCartItem = await this.cartItemsRepository.remove(cartItem);

    delete deletedCartItem.cart.user;

    return {
      message: `CartItem (id: ${id}) was deleted.`,
      deletedCartItem,
    };
  }

  private checkStockIsAvailable(quantity: number, goodsItem: GoodsItem) {
    return quantity <= goodsItem.stock;
  }

  private formatCartItem(cartItem: CartItems) {
    const sizeValue = cartItem.goodsItem.size.id;
    const formattedCartItem: any = _.cloneDeep(cartItem);
    formattedCartItem.goodsItem['size'] = sizeValue;
    delete formattedCartItem.cartItems;

    return formattedCartItem;
  }

  private checkCartItemDuplication(
    cart: Cart | AnonymousCart,
    goodsItem: GoodsItem,
  ) {
    // check goodsItem aleady exists in the cart
    cart.cartItems.forEach((cartItem) => {
      if (cartItem.goodsItem && cartItem.goodsItem.id === goodsItem.id) {
        throw new NotAcceptableException(
          `The goodsItem (id: ${cartItem.goodsItem.id}) already exists in the cart. Use "PATCH" method instead.`,
        );
      }
    });
  }

  private async saveAndGetFormattedCartItem(cartItem, cartType: CART_TYPE) {
    const savedCartItem = await this.cartItemsRepository.save(cartItem);
    const retrievedCartItem = await this.cartItemsRepository.findOne({
      where: { id: savedCartItem.id },
      relations: [
        `${cartType === CART_TYPE.CART ? 'cart' : 'anonymousCart'}`,
        'goodsItem.color',
        'goodsItem.size',
        'goodsItem.goods',
        'goodsItem.goodsItemImages',
      ],
    });

    const formattedCartItem = this.formatCartItem(retrievedCartItem);
    return formattedCartItem;
  }
}
