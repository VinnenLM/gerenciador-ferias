import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ColaboradorModule } from './colaborador/colaborador.module';
import { SetorModule } from './setor/setor.module';
import { SolicitacaoController } from './solicitacao/solicitacao.controller';
import { SolicitacaoModule } from './solicitacao/solicitacao.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [ColaboradorModule, SetorModule, SolicitacaoModule, PrismaModule],
  controllers: [AppController, SolicitacaoController],
  providers: [AppService],
})
export class AppModule {}
