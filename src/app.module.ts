import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getEnvFileName } from './helpers/check-env-file';
import { DatabaseModule } from './database/database.module';
import { ModelBootstrapModule } from './database/model-bootstrap/model-bootstrap.module';
import { databaseConfig } from './environment/configs/databases';
import { CliCommandsModule } from './cli-commands/cli-commands.module';
import { UserModule } from './user/user.module';
import { TransactionManagerModule } from './transaction-manager/transaction-manager.module';
import { AuthModule } from './auth/auth.module';
import { ContactModule } from './contact/contact.module';
import { SpamModule } from './spam/spam.module';

const envSuffix = !!process.env.OVERRIDE_ENV
  ? `.${process.env.OVERRIDE_ENV}`
  : '';

const envFileName = getEnvFileName(envSuffix);

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [databaseConfig],
      envFilePath: envFileName,
      isGlobal: true,
    }),
    DatabaseModule,
    ModelBootstrapModule,
    CliCommandsModule,
    UserModule,
    TransactionManagerModule,
    AuthModule,
    ContactModule,
    SpamModule,
  ],
  controllers: [AppController],
  providers: [AppService, ConfigService],
  exports: [ConfigService],
})
export class AppModule {}
