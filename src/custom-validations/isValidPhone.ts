import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

function isNumeric(value) {
  return /^\d+$/.test(value);
}

@ValidatorConstraint({ name: 'isValidPhone', async: false })
export class isValidPhone implements ValidatorConstraintInterface {
  validate(value: string, args: ValidationArguments) {
    return value.length > 7 && value.length < 13 && isNumeric(value);
  }

  defaultMessage(args: ValidationArguments) {
    return 'The phone number you entered is invalid. Please enter a number with 7 to 12 digits';
  }
}
