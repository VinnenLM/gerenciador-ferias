import { Controller } from '@nestjs/common';
import { Get } from '@nestjs/common/decorators';
import { SetorService } from './setor.service';

@Controller('setor')
export class SetorController {
  constructor(private readonly setorService: SetorService) {}

  @Get()
  async listarSetores() {
    return this.setorService.listarSetores();
  }
}
