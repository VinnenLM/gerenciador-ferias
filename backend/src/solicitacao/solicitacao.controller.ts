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
  @Post('gestor')
  async buscarSolicitacoesPorGestor(@Body() data) {
    return this.solicitacaoService.buscarSolicitacoesPorGestor(data);
  }
  @Post('gestor/count')
  async buscarCountSolicitacoesPorGestor(@Body() data) {
    return this.solicitacaoService.buscarCountSolicitacoesPorGestor(data);
  }
  @Post('minhasSolicitacoes')
  async buscarMinhasSolicitacoes(@Body() data) {
    return this.solicitacaoService.buscarMinhasSolicitacoes(data);
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
    @Body() { statusSolicitacao, comentarioGestor },
    @Param('id', ParseIntPipe) idSolicitacao,
  ) {
    return this.solicitacaoService.editarSolicitacao(
      idSolicitacao,
      statusSolicitacao,
      comentarioGestor,
    );
  }
  @Delete(':id')
  async excluirSolicitacao(@Param('id', ParseIntPipe) id) {
    //Parse usado para converter
    return this.solicitacaoService.excluirSolicitacao(id);
  }
}
