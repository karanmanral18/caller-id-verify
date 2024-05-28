import { Test, TestingModule } from '@nestjs/testing';
import { TransactionProviderService } from './transaction-provider.service';

describe('TransactonProviderService', () => {
  let service: TransactionProviderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TransactionProviderService],
    }).compile();

    service = module.get<TransactionProviderService>(
      TransactionProviderService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
