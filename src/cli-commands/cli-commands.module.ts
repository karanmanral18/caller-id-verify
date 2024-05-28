import { Module } from '@nestjs/common';
import { UsersSeederService } from './seeders/users-seeder/users-seeder.service';
import { UserRepoService } from '../user/user-repo/user-repo.service';
import { HashEncryptService } from '../auth/hash-encrypt/hash-encrypt.service';
import { SeederService } from './seeder/seeder.service';
import { CommandModule } from 'nestjs-command';

@Module({
  imports: [CommandModule],
  providers: [
    UsersSeederService,
    UsersSeederService,
    UserRepoService,
    HashEncryptService,
    SeederService,
  ],
})
export class CliCommandsModule {}
