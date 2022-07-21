import { IsEnum, IsString } from 'class-validator';
// import { BannerType } from '../types/banner.type';

enum BannerType {
  Main = 'Main',
  Promotion = 'Promotion',
}

export class CreateBannerDto {
  @IsString()
  imagePath: string;

  @IsString()
  content: string;

  @IsString()
  @IsEnum(BannerType)
  type: BannerType;
}
