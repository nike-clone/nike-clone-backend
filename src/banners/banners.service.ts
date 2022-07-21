import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateBannerDto } from './dto/create-banner.dto';
import { UpdateBannerDto } from './dto/update-banner.dto';

import { Repository } from 'typeorm';
import { Banner } from './entities/banner.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { NotFoundError } from 'rxjs';
import { BannersController } from './banners.controller';

enum BannerType {
  Main = 'Main',
  Promotion = 'Promotion',
}

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

  async update(id: number, updateBannerDto: UpdateBannerDto) {
    // console.log(updateBannerDto);

    const banner = await this.bannersRepository.findOne(id);

    if (!banner) {
      throw new NotFoundException(`No banner with id ${id}`);
    }

    Object.assign(banner, updateBannerDto);

    return await this.bannersRepository.save(banner);
  }

  remove(id: number) {
    return `This action removes a #${id} banner`;
  }
}
