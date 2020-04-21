import { Test, TestingModule } from '@nestjs/testing';
import { WorldController } from './world.controller';

describe('World Controller', () => {
  let controller: WorldController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WorldController],
    }).compile();

    controller = module.get<WorldController>(WorldController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
