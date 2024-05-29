import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard';
import { UserModel } from '@/database/models/user.model';
import { SequelizeToNotFoundInterceptor } from '@/interceptors/not-found.interceptor';
import { MapToUserPipe } from '@/pipes/map-to-user/map-to-user.pipe';
import { UserRepoService } from '@/user/user-repo/user-repo.service';
import {
  Controller,
  Get,
  Param,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';

@Controller('user')
export class UserController {
  constructor(private userRepoService: UserRepoService) {}

  @UseInterceptors(SequelizeToNotFoundInterceptor)
  @UseGuards(JwtAuthGuard)
  @Get('')
  async getUserByName(@Query('name') user: string) {
    return this.userRepoService.findUsersByName(user);
  }

  @UseInterceptors(SequelizeToNotFoundInterceptor)
  @UseGuards(JwtAuthGuard)
  @Get(':userId(\\d+)')
  async getUserById(@Param('userId', MapToUserPipe) user: UserModel) {
    return user;
  }
}
