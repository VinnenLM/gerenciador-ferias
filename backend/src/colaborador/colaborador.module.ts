import { Module } from '@nestjs/common';
import { ColaboradorController } from './colaborador.controller';
import { ColaboradorService } from './colaborador.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Colaborador } from './entity/colaborador.entity';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ColaboradorController],
  providers: [ColaboradorService],
  exports: [ColaboradorService],
})
export class ColaboradorModule {}
