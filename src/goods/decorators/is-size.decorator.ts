// import {
//   registerDecorator,
//   ValidationArguments,
//   ValidationOptions,
// } from 'class-validator';
// import internal from 'stream';

// export function IsSize(
//   property: internal,
//   validationOptions?: ValidationOptions,
// ) {
//   return function (object: Object, propertyName: string) {
//     registerDecorator({
//       name: 'isSize',
//       target: object.constructor,
//       constraints: [property],
//       options: validationOptions,
//       validator: {
//         validate(value: any, args: ValidationArguments) {
//           const [relatedPropertyName] = args.constraints;
//           const relatedValue = (args.object as any)[relatedPropertyName];
//           return;
//         },
//       },
//     });
//   };
// }
