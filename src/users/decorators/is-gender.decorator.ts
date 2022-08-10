import { Injectable } from '@nestjs/common';
import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationOptions,
  registerDecorator,
} from 'class-validator';

@ValidatorConstraint({ name: 'IsGender', async: true })
@Injectable()
export class IsGenderConstraint implements ValidatorConstraintInterface {
  private isGenderType = (value: string): boolean => {
    return ['Male', 'Female'].includes(value);
  };

  async validate(gender: string, args: ValidationArguments) {
    return this.isGenderType(gender);
  }

  defaultMessage(validationArguments?: ValidationArguments): string {
    return "Unacceptable gender value. (possible values: 'Male', 'Female')";
  }
}

export function IsGender(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'IsGender',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: IsGenderConstraint,
    });
  };
}
