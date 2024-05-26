import { ConnectionNames } from '@/database/connection-names';
import { SequelizeModuleOptions } from '@nestjs/sequelize';

export interface DatabaseConnectionConfig extends SequelizeModuleOptions {
  migrationDirectory: string;
  seedingDirectory: string;
}

export interface DatabaseConfig {
  databases: Record<ConnectionNames, DatabaseConnectionConfig>;
}
