import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCartItemDto } from 'src/cart-items/dto/create-cart-item.dto';
import { Repository } from 'typeorm';
import { CreateAnonymousCartDto } from './dto/create-anonymous-cart.dto';
import { UpdateAnonymousCartDto } from './dto/update-anonymous-cart.dto';
import { AnonymousCart } from './entities/anonymous-cart.entity';

@Injectable()
export class AnonymousCartService {
  constructor(
    @InjectRepository(AnonymousCart)
    private anonymousCartRepository: Repository<AnonymousCart>,
  ) {}

  async create(createAnonymousCartDto: CreateAnonymousCartDto) {
    const anonymousCart = await this.anonymousCartRepository.create(
      createAnonymousCartDto,
    );

    const { id } = await this.anonymousCartRepository.save(anonymousCart);

    const cart = this.anonymousCartRepository.findOne({
      where: { id },
      relations: ['cartItems.goodsItem'],
    });

    return cart;
  }

  async findOne(id: string) {
    const cart = await this.anonymousCartRepository.findOne({
      where: { id },
      relations: ['cartItems.goodsItem'],
    });
    return cart;
  }

  update(id: number, updateAnonymousCartDto: UpdateAnonymousCartDto) {
    return `This action updates a #${id} anonymousCart`;
  }

  remove(id: number) {
    return `This action removes a #${id} anonymousCart`;
  }
}
