import { Injectable, NotAcceptableException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GoodsClassification } from 'src/goods-classification/entities/goods-classification.entity';
import { GoodsItem } from 'src/goods-items/entities/goods-item.entity';
import { Repository } from 'typeorm';
import { CreateGoodsDto } from './dto/create-goods.dto';
import { GoodsFiltersDto } from './dto/goods-filters.dto';
import { Color } from './entities/colors.entity';
import { Gender } from './entities/genders.entity';
import { Goods } from './entities/goods.entity';
import { Size } from './entities/sizes.entity';

@Injectable()
export class GoodsService {
  constructor(
    @InjectRepository(Goods) private goodsRepository: Repository<Goods>,
    @InjectRepository(Size) private sizeRepository: Repository<Size>,
    @InjectRepository(Color) private colorRepository: Repository<Color>,
    @InjectRepository(Gender) private genderRepository: Repository<Gender>,
    @InjectRepository(GoodsClassification)
    private goodsClassificationsRepository: Repository<GoodsClassification>,
  ) {}

  async create(createGoodDto: CreateGoodsDto) {
    const {
      name,
      price,
      productImagePrimary,
      productImageExtra,
      gender,
      classification,
      salePrice,
      salePercentage,
    } = createGoodDto;

    const selectedGender = await this.genderRepository.findOne({
      where: { gender },
    });

    const selectedClassification =
      await this.goodsClassificationsRepository.findOne({
        where: { type: classification },
      });

    const goods = new Goods();
    goods.name = name;
    goods.price = price;
    goods.productImagePrimary = productImagePrimary;
    goods.productImageExtra = productImageExtra;
    goods.gender = selectedGender;
    goods.classification = selectedClassification;

    if (salePrice && salePercentage) {
      goods.salePrice = salePrice;
      goods.salePercentage = salePercentage;
    }

    return this.goodsRepository.save(goods);
  }

  async findAllGoods(goodsFilters: GoodsFiltersDto) {
    const offset = goodsFilters.offset || 0;
    const count = goodsFilters.count || 20;

    const { queryOptions, goodsRelationsList } =
      await this.generateGoodsQueryOptionsAndRelationsList(goodsFilters);

    const result = await this.goodsRepository.find({
      where: { ...queryOptions },
      relations: [
        'gender',
        'classification',
        'goodsItems.size',
        'goodsItems.color',
      ],
      take: count,
      skip: offset,
      order: { createdAt: 'DESC' },
    });

    const formattedResult = this.formatGoosds(result);

    return {
      data: formattedResult,
      meta: {
        requestedCount: count,
        offset,
        responseCount: result.length,
      },
    };
  }

  async findAllSizes() {
    const result = await this.sizeRepository.find();
    const sizes = [];
    for (const el of result) {
      sizes.push(el.id);
    }
    return sizes;
  }

  async findAllColors() {
    return await this.colorRepository.find();
  }

  async findAllGenders() {
    return await this.genderRepository.find();
  }

  async findGoodsDetail(id: number, goodsFilters: GoodsFiltersDto) {
    const { queryOptions, goodsRelationsList } =
      await this.generateGoodsQueryOptionsAndRelationsList(goodsFilters);

    const goods = await this.goodsRepository.findOne({
      where: { id, ...queryOptions },
      relations: [
        'gender',
        'classification',
        'goodsItems.color',
        'goodsItems.size',
        'goodsItems.goodsItemImages',
      ],
    });

    const formattedGoods = this.formatGoosds([goods])[0];

    // make colors list of the goodsItem
    const colors = this.getColorsFromGoodsItems(goods.goodsItems);
    Object.assign(formattedGoods, {
      colors,
    });

    return formattedGoods;
  }

  async findOne(id: number) {
    return this.goodsRepository.findOne({
      where: { id },
    });
  }

  private formatGoosds(goods) {
    // goods.goodsItems의 각 요소의 size를 size : 250 형태로 변환
    goods.forEach((g) => {
      g.goodsItems.forEach((item) => {
        item.size = item.size.id;
      });
    });

    return goods;
  }

  private getColorsFromGoodsItems(goodsItems: GoodsItem[]): Color[] {
    const allColors = goodsItems.map((item) => item.color);
    const colors = [
      ...new Map(allColors.map((color) => [color.id, color])).values(),
    ];
    return colors;
  }

  private async generateGoodsQueryOptionsAndRelationsList(
    goodsFilters: GoodsFiltersDto,
  ) {
    const queryOptions = {
      gender: null,
      classification: null,
      goodsItems: null,
    };

    if (goodsFilters.size || goodsFilters.colorCode) {
      queryOptions.goodsItems = {
        color: null,
        size: null,
      };
    }

    const goodsRelationsList = [
      'gender',
      'classification',
      'gooodsItems.sie',
      'goodsItems.color',
    ];

    if (goodsFilters.colorCode) {
      const colorCodes = goodsFilters.colorCode.map((code) => {
        return { colorCode: code };
      });

      const color = await this.colorRepository.find({
        where: colorCodes,
      });

      if (!color) {
        throw new NotAcceptableException('Unacceptable color code');
      }

      queryOptions.goodsItems.color = color;
      goodsRelationsList.push('goodsItems.color');
    }

    if (goodsFilters.size) {
      const sizeIds = goodsFilters.size.map((size) => {
        return { id: size };
      });

      const size = await this.sizeRepository.find({
        where: sizeIds,
      });

      if (!size) {
        throw new NotAcceptableException('Unacceptable size');
      }
      queryOptions.goodsItems.size = size;
      goodsRelationsList.push('goodsItems.size');
    }

    if (goodsFilters.gender) {
      const genders = goodsFilters.gender.map((gender) => {
        return { gender };
      });

      const gender = await this.genderRepository.find({
        where: genders,
      });
      if (!gender) {
        throw new NotAcceptableException('Unacceptable gender');
      }
      queryOptions.gender = gender;
    }

    if (goodsFilters.classification) {
      const classification = await this.goodsClassificationsRepository.findOne({
        where: { alias: goodsFilters.classification },
      });
      if (!classification) {
        throw new NotAcceptableException('Unacceptable classification (alias)');
      }
      queryOptions.classification = classification;
    }

    return { queryOptions, goodsRelationsList };
  }
}
