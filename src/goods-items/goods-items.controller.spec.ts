import { Test, TestingModule } from '@nestjs/testing';
import { GoodsItemsController } from './goods-items.controller';
import { GoodsItemsService } from './goods-items.service';

describe('GoodsItemsController', () => {
  let controller: GoodsItemsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GoodsItemsController],
      providers: [GoodsItemsService],
    }).compile();

    controller = module.get<GoodsItemsController>(GoodsItemsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
