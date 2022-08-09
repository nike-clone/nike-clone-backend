import { IsNumber, IsString } from 'class-validator';

export class CreateCartItemDto {
  @IsNumber()
  quantity: number;

  @IsNumber()
  goodsId: number;
}
