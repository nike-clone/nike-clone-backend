import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Repository } from 'typeorm';
import { Color } from '../entities/colors.entity';

@ValidatorConstraint({ name: 'IsColor', async: true })
@Injectable()
export class IsColorConstraint implements ValidatorConstraintInterface {
  constructor(
    @InjectRepository(Color) private colorRepository: Repository<Color>,
  ) {}

  async validate(color: any, args: ValidationArguments) {
    const selectedColor = await this.colorRepository.findOne({
      where: { name: color },
    });

    if (!selectedColor || !color) {
      return false;
    }

    return true;
  }

  defaultMessage(args: ValidationArguments) {
    return 'Unacceptable color value.';
  }
}

export function IsColor(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'IsColor',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: IsColorConstraint,
    });
  };
}
