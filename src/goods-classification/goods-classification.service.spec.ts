import { Test, TestingModule } from '@nestjs/testing';
import { GoodsClassificationService } from './goods-classification.service';

describe('GoodsClassificationService', () => {
  let service: GoodsClassificationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GoodsClassificationService],
    }).compile();

    service = module.get<GoodsClassificationService>(GoodsClassificationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
