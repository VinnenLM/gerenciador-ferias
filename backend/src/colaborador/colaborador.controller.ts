import { Controller, ParseIntPipe } from '@nestjs/common';
import { Body, Delete, Get, Param, Post, Put } from '@nestjs/common/decorators';
import { ColaboradorService } from './colaborador.service';
import { CreateColaboradorDTO } from './dto/create-colaborador.dto';

@Controller('colaborador')
export class ColaboradorController {
  constructor(private readonly colaboradorService: ColaboradorService) {}

  @Post()
  async cadastrar(@Body() data: CreateColaboradorDTO) {
    return this.colaboradorService.cadastrarColaborador(data);
  }
  @Post('login')
  async logar(@Body() data) {
    return this.colaboradorService.logar(data);
  }
  @Get()
  async listarTodos() {
    return this.colaboradorService.listarTodos();
  }
  @Post('gestor')
  async listarTodosPorGestor(@Body() data) {
    return this.colaboradorService.listarTodosPorGestor(data);
  }
  /*@Get('ferias')
  async listarTodosFerias() {
    return this.colaboradorService.listarTodosFerias();
  }
  @Get('ativo')
  async listarTodosAtivos() {
    return this.colaboradorService.listarTodosAtivos();
  }*/
  @Get('gestor')
  async listarGestores() {
    return this.colaboradorService.listarGestores();
  }
  @Get(':id')
  async buscarColaborador(@Param('id', ParseIntPipe) idColaborador) {
    return this.colaboradorService.buscarColaborador(idColaborador);
  }
  @Get(':id/ferias')
  async verificarAtrasoFerias(@Param('id', ParseIntPipe) idColaborador) {
    return this.colaboradorService.verificarAtrasoFerias(idColaborador);
  }
  @Put(':id')
  async editarSenha(
    @Body() { senha },
    @Param('id', ParseIntPipe) idColaborador,
  ) {
    return this.colaboradorService.editarSenha(idColaborador, senha);
  }
  @Delete(':id')
  async excluirColaborador(@Param('id', ParseIntPipe) id) {
    //Parse usado para converter
    return this.colaboradorService.excluirColaborador(id);
  }
}
