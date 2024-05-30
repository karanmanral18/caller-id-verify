import { Module } from '@nestjs/common';
import { UserRepoService } from './user-repo/user-repo.service';
import { HashEncryptService } from '../auth/hash-encrypt/hash-encrypt.service';
import { UserService } from './user.service';
import { UserController } from './controllers/user/user.controller';
import { ContactRepoService } from '../contact/contact-repo/contact-repo.service';
import { SpamRepoService } from '@/spam/spam-repo/spam-repo.service';

@Module({
  providers: [
    UserRepoService,
    HashEncryptService,
    UserService,
    ContactRepoService,
    SpamRepoService,
  ],
  exports: [UserRepoService, UserService, UserRepoService],
  controllers: [UserController],
})
export class UserModule {}
