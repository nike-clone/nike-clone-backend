import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { Cart } from './entities/cart.entity';

@Injectable()
export class CartsService {
  constructor(
    @InjectRepository(Cart) private cartsRepository: Repository<Cart>,
    @Inject(forwardRef(() => UsersService))
    private usersService: UsersService,
  ) {}

  async create(user: any) {
    const { userId } = user;
    const cartUser = await this.usersService.findUserById(userId);

    const cart = new Cart();
    cart.user = cartUser;
    return this.cartsRepository.save(cart);
  }

  async findCartByUserId(userId: string) {
    const user = await this.usersService.findUserById(userId);

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

    const cartUser = await this.usersService.findUserById(user.userId);

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
