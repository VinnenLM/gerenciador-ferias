import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ColaboradorController } from './colaborador.controller';
import { ColaboradorService } from './colaborador.service';

@Module({
  imports: [PrismaModule],
  controllers: [ColaboradorController],
  providers: [ColaboradorService],
})
export class ColaboradorModule {}
