import { Test, TestingModule } from '@nestjs/testing';
import { AdiantamentoController } from './adiantamento.controller';

describe('AdiantamentoController', () => {
  let controller: AdiantamentoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdiantamentoController],
    }).compile();

    controller = module.get<AdiantamentoController>(AdiantamentoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
