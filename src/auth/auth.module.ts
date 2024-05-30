import { Module } from '@nestjs/common';
import { HashEncryptService } from './hash-encrypt/hash-encrypt.service';
import { jwtConstants } from './constants/constants';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './guards/jwt.strategy';
import { AuthService } from './auth.service';
import { AuthController } from './controllers/auth/auth.controller';
import { LocalStrategy } from './guards/local.strategy';
import { UserRepoService } from '../user/user-repo/user-repo.service';

@Module({
  imports: [
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '3600s' },
    }),
  ],
  providers: [
    HashEncryptService,
    AuthService,
    LocalStrategy,
    JwtStrategy,
    UserRepoService,
  ],
  exports: [HashEncryptService],
  controllers: [AuthController],
})
export class AuthModule {}
