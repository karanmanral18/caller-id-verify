import { AuthService } from '@/auth/auth.service';
import { LocalAuthGuard } from '@/auth/guards/local-auth.guard';
import { LoginDto } from '@/dtos/loginDto';
import { RegistrationDto } from '@/dtos/registrationDto';
import {
  Body,
  Controller,
  Post,
  Request,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body(new ValidationPipe()) registrationDto: RegistrationDto) {
    return this.authService.register(registrationDto);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Body(new ValidationPipe()) loginDto: LoginDto, @Request() req) {
    return this.authService.login(req.user);
  }
}
