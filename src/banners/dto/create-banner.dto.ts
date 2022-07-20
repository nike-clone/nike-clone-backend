import { IsString } from 'class-validator';
import { BannerType } from '../types/banner.type';

export class CreateBannerDto {
  @IsString()
  imagePath: string;

  @IsString()
  content: string;

  type: BannerType;
}
