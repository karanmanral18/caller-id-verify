import {
  Column,
  Table,
  ForeignKey,
  BelongsTo,
  Scopes,
} from 'sequelize-typescript';
import { BaseModel } from './base.model';
import { UserModel } from './user.model';
import { Op, Sequelize } from 'sequelize';

@Scopes(() => ({
  filterUsersByName: (username: string) => ({
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
    attributes: [
      'name',
      'phone',
      [Sequelize.fn('COUNT', Sequelize.col('name')), 'nameCount'],
    ],
    group: ['name', 'phone'],
    order: [[Sequelize.col('nameCount'), 'DESC']],
    where: {
      phone: {
        [Op.like]: `${phone}`,
      },
    },
  }),
}))
@Table({ tableName: 'contacts' })
export class ContactModel extends BaseModel<ContactModel> {
  @Column
  public name: string | null;

  @Column
  public phone: string;

  @ForeignKey(() => UserModel)
  @Column
  public user_id: number;

  @BelongsTo(() => UserModel)
  public user: UserModel;
}
