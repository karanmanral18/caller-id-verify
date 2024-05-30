import { SearchUsersDto } from '../../../dtos/searchUsersDto';
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
  Post,
  UseGuards,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { ContactRepoService } from '../../../contact/contact-repo/contact-repo.service';
import { ContactModel } from '../../../database/models/contact.model';
import { AddNumberToSpamDto } from '../../../dtos/addNumbertoSpamDto';
import { SpamRepoService } from '../../../spam/spam-repo/spam-repo.service';

@Controller('user')
export class UserController {
  constructor(
    private userRepoService: UserRepoService,
    private contactRepoService: ContactRepoService,
    private spamRepoService: SpamRepoService,
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
    if (!user) throw new BadRequestException('Invalid user');
    const spamCount = await this.spamRepoService.getPhoneSpamCount(user.phone);
    return { user: user, isSpam: spamCount > 10 };
  }

  @Post('spam')
  async addUserToSpam(
    @Body(new ValidationPipe()) addNumberToSpamDto: AddNumberToSpamDto,
  ) {
    return this.spamRepoService.createNewSpamReport(addNumberToSpamDto);
  }
}
