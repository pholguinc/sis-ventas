import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
  ValidationOptions,
  registerDecorator,
} from 'class-validator';

@ValidatorConstraint({ name: 'customLength', async: false })
export class CustomLengthConstraint implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments) {
    const [min, max] = args.constraints;
    if (value === undefined || value === null) {
      return true; // Permitir campos vacíos
    }
    return value.toString().length >= min && value.toString().length <= max;
  }

  defaultMessage(args: ValidationArguments) {
    const [min, max] = args.constraints;
    return `La longitud debe estar entre ${min} y ${max} caracteres`;
  }
}

export function CustomLength(
  min: number,
  validationOptions?: ValidationOptions,
): PropertyDecorator {
  return function (object: Record<string, any>, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [min],
      validator: CustomLengthConstraint,
    });
  };
}
