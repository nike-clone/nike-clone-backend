import { Test, TestingModule } from '@nestjs/testing';
import { AnonymousCartService } from './anonymous-cart.service';

describe('AnonymousCartService', () => {
  let service: AnonymousCartService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AnonymousCartService],
    }).compile();

    service = module.get<AnonymousCartService>(AnonymousCartService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
