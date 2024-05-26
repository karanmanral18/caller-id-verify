import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getEnvFileName } from './helpers/check-env-file';

const envSuffix = !!process.env.OVERRIDE_ENV
  ? `.${process.env.OVERRIDE_ENV}`
  : '';

const envFileName = getEnvFileName(envSuffix);

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [],
      envFilePath: envFileName,
      isGlobal: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService, ConfigService],
  exports: [ConfigService],
})
export class AppModule {}
