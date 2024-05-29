import { Match } from '@/custom-validations/match.decorator';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  Matches,
} from 'class-validator';

export class RegistrationDto {
  @IsNotEmpty()
  @IsString()
  public name: string;

  @IsString()
  @IsEmail()
  public email: string;

  @IsNotEmpty()
  @IsString()
  public phone: string;

  @IsNotEmpty()
  @IsString()
  @IsStrongPassword(
    {
      minLength: 8,
      minLowercase: 1,
      minNumbers: 1,
      minSymbols: 1,
      minUppercase: 1,
    },
    {
      message:
        'Password must be at least 8 characters and include a number, lowercase, uppercase letter, and special character',
    },
  )
  public password: string;

  @IsNotEmpty()
  @IsString()
  @Match('password')
  public confirm_password: string;
}
