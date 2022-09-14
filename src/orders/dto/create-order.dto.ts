import {
  IsBoolean,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
import {
  PAY_METHOD_ENUM,
  PAY_STATUS_ENUM,
  PG_PROVIDER_ENUM,
} from 'src/common/enums';

/**
 * 주문 생성 request body 구조
 */
export class CreateOrderDto {
  @IsBoolean()
  success: boolean;

  @IsString()
  @IsNotEmpty()
  impUid: string;

  @IsString()
  @IsNotEmpty()
  merchantUid: string;

  @IsEnum(PAY_METHOD_ENUM)
  payMethod: PAY_METHOD_ENUM;

  @IsNumber()
  paidAmount: number;

  status: PAY_STATUS_ENUM;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEnum(PG_PROVIDER_ENUM)
  pgProvider: PG_PROVIDER_ENUM;

  @IsString()
  @IsNotEmpty()
  embPgProvider: string;

  @IsString()
  @IsNotEmpty()
  pgTid: string;

  @IsString()
  @IsNotEmpty()
  buyerName: string;

  @IsEmail()
  buyerEmail: string;

  @IsString()
  @IsNotEmpty()
  buyerTel: string;

  @IsString()
  @IsNotEmpty()
  buyerAddr: string;

  @IsString()
  @IsNotEmpty()
  buyerPostcode: string;

  @IsString()
  @IsNotEmpty()
  customData: string;

  @IsNumber()
  paidAt: number;

  @IsString()
  @IsNotEmpty()
  receiptUrl: string;
}

/**
 * 주문 생성 response body 구조
 */
export class CreateOrderResponseDto {
  @IsString()
  message: string;
}
