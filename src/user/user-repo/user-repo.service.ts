import { ContactModel } from '../../database/models/contact.model';
import { HashEncryptService } from '../../auth/hash-encrypt/hash-encrypt.service';
import { UserModel } from '../../database/models/user.model';
import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op, Transaction } from 'sequelize';
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
    @InjectModel(ContactModel) public contactModel: typeof ContactModel,
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
    const { email, phone } = user;

    const existingUser = await this.userModel.findOne({
      where: { [Op.or]: [{ email }, { phone }] },
    });

    if (existingUser) {
      const duplicateField = existingUser.email === email ? 'email' : 'phone';
      throw new ConflictException(
        `A user with the provided ${duplicateField} already exists.`,
      );
    }

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
  ): Promise<UserModel[] | ContactModel[] | null> {
    const users = await this.userModel
      .scope([{ method: ['filterUsersByName', name] }])
      .findAll();

    if (!users.length) {
      const contacts = await this.contactModel
        .scope([{ method: ['filterUsersByName', name] }])
        .findAll();
      return contacts;
    }
    return users;
  }

  public async findUsersByPhone(
    name: string,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    transaction?: Transaction,
  ): Promise<UserModel[] | ContactModel[] | null> {
    const users = await this.userModel
      .scope([{ method: ['filterUsersByPhone', name] }])
      .findAll();
    if (!users.length) {
      const contacts = await this.contactModel
        .scope([{ method: ['filterUsersByPhone', name] }])
        .findAll();
      return contacts;
    }
  }
}
