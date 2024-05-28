import { ContactModel } from '../../database/models/contact.model';
import { HashEncryptService } from '../../auth/hash-encrypt/hash-encrypt.service';
import { UserModel } from '../../database/models/user.model';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Transaction } from 'sequelize';
import { SpamReportModel } from '../../database/models/spam-report.model';

interface UserDataInterface {
  name: string;
  phone: string;
  email: string;
  contacts: ContactInterface[];
  spamReports: SpamReportType[];
}

interface ContactInterface {
  name: string;
  phone: string;
}

type SpamReportType = string;

@Injectable()
export class UserRepoService {
  constructor(
    @InjectModel(UserModel) public userModel: typeof UserModel,
    private hashService: HashEncryptService,
  ) {}

  public async createUserDirectly(
    userDetails: UserDataInterface,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    transaction?: Transaction,
  ) {
    const userToCreate = {
      ...userDetails,
      password: await this.hashService.createHash('Rubi@123'),
      spamReports: userDetails.spamReports.map((spamReport) => ({
        phone: spamReport,
      })),
    };
    return this.userModel.create(userToCreate as any, {
      include: [ContactModel, SpamReportModel],
    });
  }
}
