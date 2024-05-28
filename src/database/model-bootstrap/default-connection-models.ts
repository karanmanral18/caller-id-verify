import { ContactModel } from '../models/contact.model';
import { SpamReportModel } from '../models/spam-report.model';
import { UserModel } from '../models/user.model';

export const DefaultConnectionModels = [
  UserModel,
  ContactModel,
  SpamReportModel,
];
