import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  SequelizeModuleOptions,
  SequelizeOptionsFactory,
} from '@nestjs/sequelize';
import { DefaultConnectionModels } from '@/database/model-bootstrap/default-connection-models';
import { ConnectionNames } from '@/database/connection-names';

@Injectable()
export class DatabaseConfigService implements SequelizeOptionsFactory {
  constructor(private configService: ConfigService) {}

  createSequelizeOptions(
    connectionName?: string,
  ): Promise<SequelizeModuleOptions> | SequelizeModuleOptions {
    connectionName = connectionName || ConnectionNames.DefaultConnection;
    const config = this.configService.get<SequelizeModuleOptions>(
      `databases.${connectionName}`,
    );

    // add all the model classes here
    // config.sync = true;
    config.models = DefaultConnectionModels;

    return config;
  }
}
