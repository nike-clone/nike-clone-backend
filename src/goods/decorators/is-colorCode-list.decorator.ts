import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationOptions,
  registerDecorator,
} from 'class-validator';
import { Repository } from 'typeorm';
import { Color } from '../entities/colors.entity';

@ValidatorConstraint({ name: 'IsColorCodeList', async: true })
@Injectable()
export class IsColorCodeListConstraint implements ValidatorConstraintInterface {
  constructor(
    @InjectRepository(Color) private colorsRepository: Repository<Color>,
  ) {}

  async validate(colors: string[], args: ValidationArguments) {
    console.log(colors);
    const allColors = await this.colorsRepository.find();
    const colorCodeList = allColors.map((colorObject) => colorObject.colorCode);

    let isValid = true;
    colors.forEach((color) => {
      if (!colorCodeList.includes(color)) {
        isValid = false;
      }
    });

    return isValid;
  }

  defaultMessage(validationArguments?: ValidationArguments): string {
    return 'Unacceptable color value(s).';
  }
}

export function IsColorCodeList(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'IsColorCodeList',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: IsColorCodeListConstraint,
    });
  };
}
