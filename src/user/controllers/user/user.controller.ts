import { SearchUsersDto } from '@/dtos/searchUsersDto';
import { JwtAuthGuard } from '../../../auth/guards/jwt-auth.guard';
import { UserModel } from '../../../database/models/user.model';
import { SequelizeToNotFoundInterceptor } from '../../../interceptors/not-found.interceptor';
import { MapToUserPipe } from '../../../pipes/map-to-user/map-to-user.pipe';
import { UserRepoService } from '../../../user/user-repo/user-repo.service';
import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ContactRepoService } from '@/contact/contact-repo/contact-repo.service';
import { ContactModel } from '@/database/models/contact.model';

@Controller('user')
export class UserController {
  constructor(
    private userRepoService: UserRepoService,
    private contactRepoService: ContactRepoService,
  ) {}

  @UseInterceptors(SequelizeToNotFoundInterceptor)
  @UseGuards(JwtAuthGuard)
  @Get('search')
  async getUsers(@Body() searchUsersDto: SearchUsersDto) {
    if (!searchUsersDto.name && !searchUsersDto.phone) {
      throw new BadRequestException(
        'Invalid searchBy parameter. Must be "name" or "phone".',
      );
    }

    if (searchUsersDto.name) {
      return this.userRepoService.findUsersByName(searchUsersDto.name);
    } else if (searchUsersDto.phone) {
      return this.userRepoService.findUsersByPhone(searchUsersDto.phone);
    }
  }

  @UseInterceptors(SequelizeToNotFoundInterceptor)
  @UseGuards(JwtAuthGuard)
  @Get(':userId(\\d+)')
  async getUserById(@Param('userId', MapToUserPipe) user: UserModel) {
    return user;
  }

  @UseInterceptors(SequelizeToNotFoundInterceptor)
  @UseGuards(JwtAuthGuard)
  @Get('get-details/:phone')
  async searchUserByPhone(@Param('phone') phone: string) {
    let user: UserModel | ContactModel | null =
      await this.userRepoService.findUserByPhone(phone);
    if (!user) {
      user = await this.contactRepoService.findUserByPhone(phone);
    }
    return user;
  }
}
