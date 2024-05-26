import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ConnectionNames } from './connection-names';
import { SequelizeModule } from '@nestjs/sequelize';
import { DatabaseConfigService } from './database-config/database-config.service';

@Module({
  imports: [
    SequelizeModule.forRootAsync({
      useClass: DatabaseConfigService,
      imports: [ConfigModule],
      name: ConnectionNames.DefaultConnection,
    }),
  ],
  providers: [ConfigService, DatabaseConfigService],
  exports: [SequelizeModule],
})
export class DatabaseModule {}
