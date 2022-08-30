import { IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class UpdateCartItemDto {
  @IsNumber()
  @Min(1)
  quantity: number;

  @IsNumber()
  size: number;

  @IsNumber()
  colorId: number;
}
