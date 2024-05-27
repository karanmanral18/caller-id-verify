import { Column, Table, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { BaseModel } from './base.model';
import { UserModel } from './user.model';

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
