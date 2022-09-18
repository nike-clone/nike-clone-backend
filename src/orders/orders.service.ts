import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { FindOptionsWhere, Repository } from 'typeorm';
import { CreateOrderDto, CreateOrderResponseDto } from './dto/create-order.dto';
import { FindOrderResponseDto } from './dto/find-order.dto';
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
        customData: JSON.stringify(createOrderDto.customData),
        anonymousId: anonymoud_id,
      });
    } else {
      // 회원 주문
      order = await this.ordersRepository.create({
        ...createOrderDto,
        customData: JSON.stringify(createOrderDto.customData),
        user,
      });
    }
    await this.ordersRepository.save(order);

    return {
      message: `Order (id: ${order.id}) was successfully created.`,
    };
  }

  /**
   * 주문 목록 조회 서비스 함수
   * @param user 로그인한 경우 user object
   * @param anonymous_id 비회원 주문의 경우 비회원 id
   * @returns 결제 정보 목록
   */
  async findAll(
    user: User,
    anonymous_id: string,
  ): Promise<FindOrderResponseDto[]> {
    const whereOptions: FindOptionsWhere<Orders> = {};

    // 비회원 주문
    if (anonymous_id) {
      whereOptions['anonymousId'] = anonymous_id;
    } else {
      // 회원 주문
      // 회원 주문일 경우 anonymous_id query parameter가 undefined
      whereOptions.user = {
        id: user.id,
      };
    }

    const orders = await this.ordersRepository.find({
      where: whereOptions,
    });

    const response: FindOrderResponseDto[] = [];

    for (let i = 0; i < orders.length; i++) {
      response.push({
        ...orders[i],
        customData: JSON.parse(orders[i].customData),
      });
    }

    return response;
  }

  async findOrderById(id: string) {
    const order = await this.ordersRepository.findOne({ where: { id } });

    if (!order) {
      throw new NotFoundException(`Order (id: ${id}) not found.`);
    }

    return order;
    // 회원일 경우
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
