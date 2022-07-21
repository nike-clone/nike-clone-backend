import { PartialType } from '@nestjs/mapped-types';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { CreateBannerDto } from './create-banner.dto';
enum BannerType {
  Main = 'Main',
  Promotion = 'Promotion',
}

export class UpdateBannerDto extends PartialType(CreateBannerDto) {
  @IsOptional()
  @IsString()
  iamge_path?: string;

  @IsOptional()
  @IsString()
  content?: string;

  @IsOptional()
  @IsEnum(BannerType)
  type?: BannerType;
}
