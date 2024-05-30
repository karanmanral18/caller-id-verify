import { Test, TestingModule } from '@nestjs/testing';
import { SpamRepoService } from './spam-repo.service';

describe('SpamRepoService', () => {
  let service: SpamRepoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SpamRepoService],
    }).compile();

    service = module.get<SpamRepoService>(SpamRepoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
