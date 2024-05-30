import { Test, TestingModule } from '@nestjs/testing';
import { ContactRepoService } from './contact-repo.service';

describe('ContactRepoService', () => {
  let service: ContactRepoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ContactRepoService],
    }).compile();

    service = module.get<ContactRepoService>(ContactRepoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
