import { Injectable } from '@nestjs/common';
import { Seeder } from '../seeder';
import { UserRepoService } from '../../../user/user-repo/user-repo.service';
import { TransactionProviderService } from '../../../transaction-manager/transaction-provider/transaction-provider.service';
import { readFileSync } from 'fs';
import { join } from 'path';

@Injectable()
export class UsersSeederService extends Seeder {
  constructor(
    private transactionProvider: TransactionProviderService,
    private userRepo: UserRepoService,
  ) {
    super();
  }

  /**
   * Creates all users in the system
   */
  public async seed(): Promise<any> {
    const usersDataPath = join(
      __dirname,
      '..',
      '..',
      '..',
      'helpers',
      'users.json',
    );

    const rawData = readFileSync(usersDataPath, 'utf-8');
    const usersData: any[] = JSON.parse(rawData);
    const users = usersData['users'];

    return this.transactionProvider
      .create()
      .then(async (transaction) => {
        for (const user of users) {
          await this.userRepo.createUserDirectly(user, transaction);
        }
        await transaction.commit();
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
