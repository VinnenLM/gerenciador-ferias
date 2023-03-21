import { Module } from '@nestjs/common';
import { SetorService } from './setor.service';
import { SetorController } from './setor.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [SetorController],
  providers: [SetorService],
  exports: [SetorService],
})
export class SetorModule {}
