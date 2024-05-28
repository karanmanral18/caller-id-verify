import { Module } from '@nestjs/common';
import { HashEncryptService } from './hash-encrypt/hash-encrypt.service';

@Module({
  providers: [HashEncryptService],
  exports: [HashEncryptService],
})
export class AuthModule {}
