import { Injectable } from '@nestjs/common';
import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationOptions,
  registerDecorator,
} from 'class-validator';
import { Gender } from '../dto/goods-filters.dto';

@ValidatorConstraint({ name: 'IsGendersList', async: true })
@Injectable()
export class IsGendersListConstraint implements ValidatorConstraintInterface {
  private isGenderType = (value: string): boolean => {
    return ['Male', 'Female', 'Unisex'].includes(value);
  };

  async validate(genders: Gender[], args: ValidationArguments) {
    let isValid = true;
    genders.forEach((gender) => {
      if (!this.isGenderType(gender)) {
        isValid = false;
      }
    });

    return isValid;
  }

  defaultMessage(validationArguments?: ValidationArguments): string {
    return "Unacceptable gender value. (possible values: 'Male', 'Female', 'Unisex')";
  }
}

export function IsGendersList(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'IsGendersList',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: IsGendersListConstraint,
    });
  };
}
