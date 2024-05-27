import { Column, HasMany, Table, Unique } from 'sequelize-typescript';
import { BaseModel } from './base.model';
import { ContactModel } from './contact.model';

@Table({ tableName: 'users' })
export class UserModel extends BaseModel<UserModel> {
  @Unique
  @Column
  public email: string | null;

  @Unique
  @Column
  public phone: string | null;

  @Column
  public password: string | null;

  @HasMany(() => ContactModel)
  contacts: ContactModel[];
}
