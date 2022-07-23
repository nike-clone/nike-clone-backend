import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async createCategory(categoryName: string) {
    //check category exists
    const categoryExists = await this.checkCategoryExistsByName(categoryName);

    if (categoryExists) {
      throw new UnprocessableEntityException(
        `Category "${categoryName}" already exists.`,
      );
    }

    const newCategory = { name: categoryName };
    const createdCategory = await this.categoryRepository.save(newCategory);
    return {
      message: 'The category was successfully created!',
      data: { id: createdCategory.id, name: createdCategory.name },
    };
  }

  async findAll() {
    return await this.categoryRepository.find();
  }

  async findOne(id: number) {
    const category = await this.categoryRepository.findOne({ where: { id } });
    if (!category) {
      throw new NotFoundException('Category id not registered.');
    }

    return { data: { category } };
  }

  async update(id: number, updatedName: string) {
    const categoryExists = await this.checkCategoryExistsByName(updatedName);
    if (categoryExists) {
      throw new BadRequestException(
        `Category "${updatedName}" already exists.`,
      );
    }

    await this.categoryRepository.update(id, { name: updatedName });

    return {
      message: 'The category was successfully updated!',
      data: { id: +id, name: updatedName },
    };
  }

  async remove(id: number) {
    const category = await this.categoryRepository.findOne({ where: { id } });
    if (!category) {
      throw new NotFoundException('Category id not registered.');
    }

    await this.categoryRepository.remove(category);
    return {
      message: 'The category was successfully updated!',
    };
  }

  private async checkCategoryExistsByName(name) {
    const category = await this.categoryRepository.findOne({ where: { name } });

    return category !== undefined;
  }

  private async checkCategoryExistsById(id) {
    const category = await this.categoryRepository.findOne({
      where: { id },
    });

    return category !== undefined;
  }
}
