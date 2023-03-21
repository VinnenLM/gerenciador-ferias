import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { SolicitacaoController } from './solicitacao.controller';
import { SolicitacaoService } from './solicitacao.service';

@Module({
  imports: [PrismaModule],
  controllers: [SolicitacaoController],
  providers: [SolicitacaoService],
  exports: [SolicitacaoService],
})
export class SolicitacaoModule {}
