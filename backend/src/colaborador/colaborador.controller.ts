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
    return this.colaboradorService.findAll();
  }
  @Get(':id')
  async readOne(@Param('id', ParseIntPipe) id) {
    return this.colaboradorService.findOne(id);
  }
  @Put(':id')
  async editPassword(@Body() req, @Param('id', ParseIntPipe) id) {
    return this.colaboradorService.updatePassword(id, req.senha);
  }
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id) {
    //Parse usado para converter
    return this.colaboradorService.delete(id);
  }
}
