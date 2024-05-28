import { Column, Table, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { BaseModel } from './base.model';
import { UserModel } from './user.model';

@Table({ tableName: 'spam_reports' })
export class SpamReportModel extends BaseModel<SpamReportModel> {
  @Column
  public phone: string;

  @ForeignKey(() => UserModel)
  @Column
  public user_id: number;

  @BelongsTo(() => UserModel)
  public user: UserModel;
}
