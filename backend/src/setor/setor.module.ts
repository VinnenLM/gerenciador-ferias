import { Module } from '@nestjs/common';
import { SetorController } from './setor.controller';
import { SetorService } from './setor.service';
import { SetorController } from './setor.controller';

@Module({
  controllers: [SetorController],
  providers: [SetorService]
})
export class SetorModule {}
