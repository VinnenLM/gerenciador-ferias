import { Module } from '@nestjs/common';
import { AdiantamentoController } from './adiantamento.controller';
import { AdiantamentoService } from './adiantamento.service';

@Module({
  controllers: [AdiantamentoController],
  providers: [AdiantamentoService]
})
export class AdiantamentoModule {}
