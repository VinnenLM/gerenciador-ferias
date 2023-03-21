import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ColaboradorModule } from './colaborador/colaborador.module';
import { SetorModule } from './setor/setor.module';
import { SolicitacaoController } from './solicitacao/solicitacao.controller';
import { SolicitacaoModule } from './solicitacao/solicitacao.module';
import { PerfilController } from './perfil/perfil.controller';
import { PerfilService } from './perfil/perfil.service';
import { PerfilModule } from './perfil/perfil.module';
//import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Colaborador } from './colaborador/entity/colaborador.entity';
import { Setor } from './setor/entity/setor.entity';
import { Perfil } from './perfil/entity/perfil.entity';

@Module({
  imports: [
    ColaboradorModule,
    SetorModule,
    SolicitacaoModule,
    PerfilModule,
    //AuthModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'qqtech4.crqc50gxdjpu.sa-east-1.rds.amazonaws.com',
      port: 5432,
      username: '980163',
      password: '980163',
      database: '980163',
      schema: 'QQFerias',
      entities: [Colaborador, Setor, Perfil],
      synchronize: false,
    }),
  ],
  controllers: [AppController, SolicitacaoController, PerfilController],
  providers: [AppService, PerfilService],
})
export class AppModule {}
