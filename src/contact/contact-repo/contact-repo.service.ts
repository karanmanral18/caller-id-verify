import { ContactModel } from '@/database/models/contact.model';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Transaction } from 'sequelize';

@Injectable()
export class ContactRepoService {
  constructor(
    @InjectModel(ContactModel) public contactModel: typeof ContactModel,
  ) {}
  public async findUserByPhone(
    phone: string,
    transaction?: Transaction,
  ): Promise<ContactModel | null> {
    return this.contactModel
      .unscoped()
      .findOne({ where: { phone }, transaction })
      .then((result) => (!!result ? result : null));
  }
}
