import { Test, TestingModule } from '@nestjs/testing';
import { AdiantamentoService } from './adiantamento.service';

describe('AdiantamentoService', () => {
  let service: AdiantamentoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AdiantamentoService],
    }).compile();

    service = module.get<AdiantamentoService>(AdiantamentoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
