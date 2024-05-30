import { SpamReportModel } from '../../database/models/spam-report.model';
import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Transaction } from 'sequelize';
import { Request } from 'express';
import { REQUEST } from '@nestjs/core';

@Injectable()
export class SpamRepoService {
  constructor(
    @InjectModel(SpamReportModel)
    public spamReportModel: typeof SpamReportModel,
    @Inject(REQUEST) private readonly request: Request,
  ) {}

  public async createNewSpamReport(
    spamReport: Pick<SpamReportModel, 'phone'>,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    transaction?: Transaction,
  ): Promise<SpamReportModel> {
    console.log(this.request);
    return this.spamReportModel
      .build({
        phone: spamReport.phone,
      })
      .save();
  }

  public async getPhoneSpamCount(phone: string): Promise<number> {
    const spamCount = await this.spamReportModel.count({
      where: {
        phone,
      },
    });
    return spamCount;
  }
}
