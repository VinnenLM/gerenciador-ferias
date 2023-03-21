import { Controller, ParseIntPipe } from '@nestjs/common';
import { Body, Delete, Get, Param, Post, Put } from '@nestjs/common/decorators';
import { SolicitacaoService } from './solicitacao.service';
import { CreateSolicitacaoDTO } from './dto/create-solicitacao.dto';

@Controller('solicitacao')
export class SolicitacaoController {
  constructor(private readonly solicitacaoService: SolicitacaoService) {}

  @Post()
  async salvarSolicitacao(@Body() data: CreateSolicitacaoDTO) {
    return this.solicitacaoService.salvarSolicitacao(data);
  }
  @Get()
  async listarSolicitacoes() {
    return this.solicitacaoService.listarSolicitacoes();
  }
  @Get(':id')
  async buscarSolicitacao(@Param('id', ParseIntPipe) idColaborador) {
    return this.solicitacaoService.buscarSolicitacao(idColaborador);
  }
  @Put(':id')
  async editarSolicitacao(
    @Body() { senha },
    @Param('id', ParseIntPipe) idColaborador,
  ) {
    return this.solicitacaoService.editarSolicitacao(idColaborador, senha);
  }
  @Delete(':id')
  async excluirSolicitacao(@Param('id', ParseIntPipe) id) {
    //Parse usado para converter
    return this.solicitacaoService.excluirSolicitacao(id);
  }
}
