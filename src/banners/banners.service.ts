import { Injectable, NotFoundException } from '@nestjs/common';
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

  findAll(type) {
    let query;
    if (type) {
      query = { where: { type } };
    }
    return this.bannersRepository.find(query);
  }

  async findOne(id: number) {
    const banner = await this.bannersRepository.findOne({ where: { id } });

    if (!banner) {
      throw new NotFoundException(`No banner with id ${id}`);
    }

    return banner;
  }

  async update(id: number, updateBannerDto: UpdateBannerDto) {
    const banner = await this.bannersRepository.findOne({ where: { id } });

    if (!banner) {
      throw new NotFoundException(`No banner with id ${id}`);
    }

    Object.assign(banner, updateBannerDto);

    return await this.bannersRepository.save(banner);
  }

  async remove(id: number) {
    const banner = await this.bannersRepository.findOne({ where: { id } });
    if (!banner) {
      throw new NotFoundException(`No banner with id ${id}`);
    }

    await this.bannersRepository.remove(banner);

    return {
      message: `The banner (id: ${id}) was successfully removed. `,
    };
  }
}
