import { Test, TestingModule } from '@nestjs/testing';
import { GoodsItemImagesService } from './goods-item-images.service';

describe('GoodsItemImagesService', () => {
  let service: GoodsItemImagesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GoodsItemImagesService],
    }).compile();

    service = module.get<GoodsItemImagesService>(GoodsItemImagesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
