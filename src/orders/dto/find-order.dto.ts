import {
  IsBoolean,
  IsDate,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsString,
} from 'class-validator';
import {
  PAY_METHOD_ENUM,
  PAY_STATUS_ENUM,
  PG_PROVIDER_ENUM,
} from 'src/common/enums';

export class FindOrderResponseDto {
  @IsNumber()
  id: number;

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

  @IsEnum(PAY_STATUS_ENUM)
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

  @IsObject()
  customData: object;

  @IsNumber()
  paidAt: number;

  @IsString()
  @IsNotEmpty()
  receiptUrl: string;

  @IsString()
  anonymousId: string;

  @IsDate()
  createdAt: Date;
}
