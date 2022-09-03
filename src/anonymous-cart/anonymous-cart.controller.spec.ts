import { Test, TestingModule } from '@nestjs/testing';
import { AnonymousCartController } from './anonymous-cart.controller';
import { AnonymousCartService } from './anonymous-cart.service';

describe('AnonymousCartController', () => {
  let controller: AnonymousCartController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AnonymousCartController],
      providers: [AnonymousCartService],
    }).compile();

    controller = module.get<AnonymousCartController>(AnonymousCartController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
