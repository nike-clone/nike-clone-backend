import { Test, TestingModule } from '@nestjs/testing';
import { GoodsItemsService } from './goods-items.service';

describe('GoodsItemsService', () => {
  let service: GoodsItemsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GoodsItemsService],
    }).compile();

    service = module.get<GoodsItemsService>(GoodsItemsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
