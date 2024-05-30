import { Module } from '@nestjs/common';
import { SpamRepoService } from './spam-repo/spam-repo.service';

@Module({
  providers: [SpamRepoService],
  exports: [SpamRepoService],
})
export class SpamModule {}
