import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ColaboradorModule } from './colaborador/colaborador.module';
import { SetorModule } from './setor/setor.module';
import { FeriasModule } from './ferias/ferias.module';
import { AdiantamentoModule } from './adiantamento/adiantamento.module';

@Module({
  imports: [ColaboradorModule, SetorModule, FeriasModule, AdiantamentoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
