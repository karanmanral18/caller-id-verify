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
import { Op, Sequelize } from 'sequelize';

@DefaultScope(() => ({
  attributes: { exclude: ['password'] },
}))
@Scopes(() => ({
  withoutPassword: {
    attributes: { exclude: ['password'] },
  },
  searchUsername: (username: string) => ({
    order: [
      // Sort by name (ascending) with a priority for names starting with the search query
      [Sequelize.col('name'), 'ASC'],
      [
        // In case of name equality, sort by email (ascending)
        Sequelize.col('email'),
        'ASC',
      ],
    ],
    where: {
      [Op.or]: [
        // Names starting with the search query (exact match)
        {
          name: {
            [Op.eq]: username,
          },
        },
        // Names containing but not starting with the search query
        {
          name: {
            [Op.like]: `%${username}%`,
            [Op.notLike]: `${username}%`,
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
