import { IsNotEmpty, IsString } from 'class-validator';

export class AddNumberToSpamDto {
  @IsNotEmpty()
  @IsString()
  public phone: string;
}
