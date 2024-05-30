import { Module } from '@nestjs/common';
import { ContactRepoService } from './contact-repo/contact-repo.service';

@Module({
  providers: [ContactRepoService],
  exports: [ContactRepoService],
})
export class ContactModule {}
