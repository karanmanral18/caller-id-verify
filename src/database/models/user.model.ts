import {
  Column,
  DefaultScope,
  HasMany,
  Scopes,
  Table,
  Unique,
} from 'sequelize-typescript';
import { BaseModel } from './base.model';
import { ContactModel } from './contact.model';
import { SpamReportModel } from './spam-report.model';
import { Op } from 'sequelize';

@DefaultScope(() => ({
  attributes: { exclude: ['password'] },
}))
@Scopes(() => ({
  filterUsersByName: (username: string) => ({
    attributes: { exclude: ['password', 'email', 'created_at', 'updated_at'] },
    where: {
      [Op.or]: [
        {
          name: {
            [Op.like]: `%${username}%`,
          },
        },
      ],
    },
  }),
  filterUsersByPhone: (phone: string) => ({
    attributes: { exclude: ['password', 'email', 'created_at', 'updated_at'] },
    where: {
      [Op.or]: [
        {
          phone: {
            [Op.like]: `%${phone}%`,
          },
        },
      ],
    },
  }),
}))
@Table({ tableName: 'users' })
export class UserModel extends BaseModel<UserModel> {
  @Unique
  @Column
  public email: string | null;

  @Column
  public name: string | null;

  @Unique
  @Column
  public phone: string | null;

  @Column
  public password: string | null;

  @HasMany(() => ContactModel)
  contacts: ContactModel[];

  @HasMany(() => SpamReportModel)
  spamReports: SpamReportModel[];
}
