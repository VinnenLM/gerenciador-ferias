import { Controller, ParseIntPipe } from '@nestjs/common';
import { Body, Delete, Get, Param, Post, Put } from '@nestjs/common/decorators';
import { ColaboradorService } from './colaborador.service';
import { CreateColaboradorDTO } from './dto/create-colaborador.dto';

@Controller('colaborador')
export class ColaboradorController {
  constructor(private readonly colaboradorService: ColaboradorService) {}

  @Post()
  async create(@Body() req: CreateColaboradorDTO) {
    return this.colaboradorService.create(req);
  }
  @Get()
  async list() {
    return { res: 'Opa bom?' };
  }
  @Get(':id')
  async readOne(@Param() param) {
    return { res: 'Get One', param };
  }
  @Put(':id')
  async edit(@Body() body, @Param() id) {
    return { res: 'Put', id: id };
  }
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id) {
    //Parse usado para converter
    return { res: 'Delete', id: id };
  }
}
