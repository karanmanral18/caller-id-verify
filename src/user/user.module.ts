import { Module } from '@nestjs/common';
import { UserRepoService } from './user-repo/user-repo.service';
import { HashEncryptService } from '../auth/hash-encrypt/hash-encrypt.service';

@Module({
  providers: [UserRepoService, HashEncryptService],
  exports: [UserRepoService],
})
export class UserModule {}
