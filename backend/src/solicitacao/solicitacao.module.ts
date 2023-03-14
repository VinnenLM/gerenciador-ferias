import { Module } from '@nestjs/common';
import { SolicitacaoService } from './solicitacao.service';

@Module({
  providers: [SolicitacaoService]
})
export class SolicitacaoModule {}
