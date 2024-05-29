import { Module } from '@nestjs/common';
import { UserRepoService } from './user-repo/user-repo.service';
import { HashEncryptService } from '../auth/hash-encrypt/hash-encrypt.service';
import { UserService } from './user.service';

@Module({
  providers: [UserRepoService, HashEncryptService, UserService],
  exports: [UserRepoService, UserService, UserRepoService],
  controllers: [],
})
export class UserModule {}
