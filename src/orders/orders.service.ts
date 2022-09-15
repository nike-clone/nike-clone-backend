import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { FindOptionsWhere, Repository } from 'typeorm';
import { CreateOrderDto, CreateOrderResponseDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Orders } from './entities/orders.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Orders) private ordersRepository: Repository<Orders>,
  ) {}

  /**
   * 주문 생성 서비스 함수
   * @param createOrderDto 주문 생성 request body 구조
   * @param user 로그인 했을 경우 유저 정보
   * @param anonymoud_id 비회원 주문의 경우 비회원 id
   * @returns { message }
   */
  async create(
    createOrderDto: CreateOrderDto,
    user: User,
    anonymoud_id: string,
  ): Promise<CreateOrderResponseDto> {
    let order: Orders;
    // 비회원 주문
    if (anonymoud_id) {
      order = await this.ordersRepository.create({
        ...createOrderDto,
        anonymousId: anonymoud_id,
      });
    } else {
      // 회원 주문
      order = await this.ordersRepository.create({ ...createOrderDto, user });
    }
    await this.ordersRepository.save(order);

    return {
      message: `Order (id: ${order.id}) was successfully created.`,
    };
  }

  /**
   * 결제 정보 목록 조회 서비
   * @param user 
   * @param anonymous_id 
   * @returns 
   */
  async findAll(user: User, anonymous_id: string) {
    const whereOptions: FindOptionsWhere<Orders> = {};

    // 비회원 주문
    if (anonymous_id) {
      whereOptions['anonymousId'] = anonymous_id;
    } else {
      // 회원 주문
      whereOptions.user = {
        id: user.id,
      };
    }
    console.log(anonymous_id);
    console.log(whereOptions);
    const orders = await this.ordersRepository.find({
      where: whereOptions,
    });

    return orders;
  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
