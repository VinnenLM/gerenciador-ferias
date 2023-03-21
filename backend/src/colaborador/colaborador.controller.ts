import { Controller, ParseIntPipe } from '@nestjs/common';
import { Body, Delete, Get, Param, Post, Put } from '@nestjs/common/decorators';
import { ColaboradorService } from './colaborador.service';
import { CreateColaboradorDTO } from './dto/create-colaborador.dto';

@Controller('colaborador')
export class ColaboradorController {
  constructor(private readonly colaboradorService: ColaboradorService) {}

  @Post()
  async create(@Body() body: CreateColaboradorDTO) {
    return this.colaboradorService.create(body);
  }
  @Get()
  async list() {
    return this.colaboradorService.findAll();
  }
  @Get('gestor')
  async listGestor() {
    return this.colaboradorService.findGestor();
  }
  @Get(':id')
  async readOne(@Param('id', ParseIntPipe) id) {
    return this.colaboradorService.findOne(id);
  }
  @Put(':id')
  async editPassword(
    @Body() { senha },
    @Param('id', ParseIntPipe) idColaborador,
  ) {
    return this.colaboradorService.updatePassword(idColaborador, senha);
  }
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id) {
    //Parse usado para converter
    return this.colaboradorService.delete(id);
  }
}
