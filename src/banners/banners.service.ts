import { Injectable } from '@nestjs/common';
import { CreateBannerDto } from './dto/create-banner.dto';
import { UpdateBannerDto } from './dto/update-banner.dto';

import { Repository } from 'typeorm';
import { Banner } from './entities/banner.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class BannersService {
  constructor(
    @InjectRepository(Banner) private bannersRepository: Repository<Banner>,
  ) {}

  async create(createBannerDto: CreateBannerDto) {
    const { imagePath, content, type } = createBannerDto;
    const banner = new Banner();
    Object.assign(banner, {
      imagePath,
      content,
      type,
    });

    return await this.bannersRepository.save(banner);
  }

  findAll() {
    return `This action returns all banners`;
  }

  findOne(id: number) {
    return `This action returns a #${id} banner`;
  }

  update(id: number, updateBannerDto: UpdateBannerDto) {
    return `This action updates a #${id} banner`;
  }

  remove(id: number) {
    return `This action removes a #${id} banner`;
  }
}
