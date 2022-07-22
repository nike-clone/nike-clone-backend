import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
} from 'class-validator';
import internal from 'stream';

export function IsSize(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isSize',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          const [relatedPropertyName] = args.constraints;
          // const relatedValue = (args.object as any)[relatedPropertyName];
          const sizes = [
            220, 225, 230, 235, 240, 245, 250, 255, 260, 265, 270, 275, 280,
            285, 290, 295, 300, 305, 310, 320, 330, 340, 350, 360, 380,
          ];
          return sizes.includes(value);
        },
      },
    });
  };
}
