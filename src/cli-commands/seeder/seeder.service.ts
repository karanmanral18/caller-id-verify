import { Injectable, Logger } from '@nestjs/common';
import { Argv, Command, Option } from 'nestjs-command';
import { ModuleRef } from '@nestjs/core';
import { Seeder, SeederConstruct } from '../seeder';
import { UsersSeederService } from '../seeders/users-seeder/users-seeder.service';

interface ToSeedActions {
  all: boolean;
}

const AllowedKeys: (keyof ToSeedActions)[] = ['all'];

const InputSeedersMapping: Record<keyof ToSeedActions, SeederConstruct[]> = {
  all: [],
};

@Injectable()
export class SeederService {
  constructor(private readonly moduleRef: ModuleRef) {}

  static SeedMaps: SeederConstruct[] = [];

  @Command({
    command: 'seeder:seed',
    describe: 'Seed database',
  })
  public async seed(
    @Option({
      name: 'all',
      type: 'boolean',
      default: false,
    })
    value: any,
    @Option({
      name: 'all',
      type: 'boolean',
      default: false,
      alias: 'a',
    })
    seedAll = false,
    @Option({ name: 'seed-users', type: 'boolean', default: false })
    seedUsers = false,
    @Argv()
    argv: ToSeedActions,
  ) {
    if (seedAll || seedUsers) {
      SeederService.SeedMaps.push(UsersSeederService);
    }
    this.attachSeedersAsPerInputs(argv);

    const logger = new Logger();
    for (const seeder of SeederService.SeedMaps) {
      logger.log(`Seeding for ${seeder.name}`, 'Seeder');
      const seederInstance = this.moduleRef.get<Seeder>(seeder);
      await seederInstance.seed();
      logger.log(`Seeding completed for ${seeder.name}`, 'Seeder');
    }
  }

  protected attachSeedersAsPerInputs(inputs: ToSeedActions) {
    for (const [key, value] of Object.entries(inputs) as [
      keyof ToSeedActions,
      boolean,
    ][]) {
      if (!AllowedKeys.includes(key)) {
        continue;
      }

      if (value) {
        SeederService.SeedMaps.push(...InputSeedersMapping[key]);
      }
    }
  }
}
