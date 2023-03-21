import { Module } from '@nestjs/common';
import { ColaboradorController } from './colaborador.controller';
import { ColaboradorService } from './colaborador.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Colaborador } from './entity/colaborador.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Colaborador])],
  controllers: [ColaboradorController],
  providers: [ColaboradorService],
  exports: [ColaboradorService],
})
export class ColaboradorModule {}
