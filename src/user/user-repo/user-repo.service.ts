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

  /**
   * Creates new user
   * @param user
   * @param profile
   * @param transaction
   * @private
   */
  public async createNewUser(
    user: Pick<UserModel, 'name' | 'email' | 'phone' | 'password'>,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    transaction?: Transaction,
  ): Promise<UserModel> {
    return this.userModel
      .build()
      .setAttributes(user)
      .setAttributes({
        password: await this.hashService.createHash(user.password),
      })
      .save();
  }

  /**
   * Finds the user or fails
   * @param id
   * @param transaction
   */
  public findOrFail(id: number, transaction?: Transaction): Promise<UserModel> {
    return this.userModel.findByPk(id, { transaction, rejectOnEmpty: true });
  }

  public async findUserByPhone(
    phone: string,
    transaction?: Transaction,
  ): Promise<UserModel | null> {
    return this.userModel
      .findOne({ where: { phone }, transaction })
      .then((result) => (!!result ? result : null));
  }

  public async findUsersByName(
    name: string,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    transaction?: Transaction,
  ): Promise<UserModel[] | null> {
    return this.userModel
      .scope([{ method: ['searchUsername', name] }])
      .scope('withoutPassword')
      .findAll();
  }
}
