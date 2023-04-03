import { Module } from '@nestjs/common';
import { ColaboradorModule } from 'src/colaborador/colaborador.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { SolicitacaoController } from './solicitacao.controller';
import { SolicitacaoService } from './solicitacao.service';

@Module({
  imports: [PrismaModule, ColaboradorModule],
  controllers: [SolicitacaoController],
  providers: [SolicitacaoService],
  exports: [SolicitacaoService],
})
export class SolicitacaoModule {}
