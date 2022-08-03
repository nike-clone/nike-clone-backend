import { Test, TestingModule } from '@nestjs/testing';
import { GoodsClassificationController } from './goods-classification.controller';
import { GoodsClassificationService } from './goods-classification.service';

describe('GoodsClassificationController', () => {
  let controller: GoodsClassificationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GoodsClassificationController],
      providers: [GoodsClassificationService],
    }).compile();

    controller = module.get<GoodsClassificationController>(
      GoodsClassificationController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
