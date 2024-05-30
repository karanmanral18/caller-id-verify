import { IsString } from 'class-validator';

export class SearchUsersDto {
  @IsString()
  public phone: string;

  @IsString()
  public name: string;
}
