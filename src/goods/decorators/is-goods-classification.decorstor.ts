import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { GoodsClassification } from 'src/goods-classification/entities/goods-classification.entity';
import { Repository } from 'typeorm';

@ValidatorConstraint({ name: 'IsGoodsClassification', async: true })
@Injectable()
export class IsGoodsClassificationConstraint
  implements ValidatorConstraintInterface
{
  constructor(
    @InjectRepository(GoodsClassification)
    private goodsClassificationRepository: Repository<GoodsClassification>,
  ) {}

  async validate(classification: any, args: ValidationArguments) {
    const selectedClassification =
      await this.goodsClassificationRepository.findOne({
        where: { type: classification },
      });

    if (!selectedClassification) {
      return false;
    }

    return true;
  }

  defaultMessage(validationArguments?: ValidationArguments): string {
    return 'Unacceptable goods classificaion value';
  }
}

export function IsGoodsClassification(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'IsGoodsClassification',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: IsGoodsClassificationConstraint,
    });
  };
}
