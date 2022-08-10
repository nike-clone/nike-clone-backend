import { Test, TestingModule } from '@nestjs/testing';
import { GoodsItemImagesController } from './goods-item-images.controller';
import { GoodsItemImagesService } from './goods-item-images.service';

describe('GoodsItemImagesController', () => {
  let controller: GoodsItemImagesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GoodsItemImagesController],
      providers: [GoodsItemImagesService],
    }).compile();

    controller = module.get<GoodsItemImagesController>(GoodsItemImagesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
