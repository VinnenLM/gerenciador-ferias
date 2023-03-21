import { Injectable } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common/exceptions';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SolicitacaoService {
  constructor(private readonly prisma: PrismaService) {}

  async salvarSolicitacao(data) {
    data.dataContratacao = new Date(data.dataContratacao);
    data.gmail = data.gmail ? data.gmail : null;
    data.idGestor = data.idGestor ? data.idGestor : null;
    return this.prisma.colaborador.create({ data });
  }

  async listarSolicitacoes() {
    return this.prisma.colaborador.findMany();
  }
  async buscarSolicitacao(idColaborador: number) {
    await this.exists(idColaborador);
    return this.prisma.colaborador.findFirst({
      where: {
        idColaborador,
      },
    });
  }
  async editarSolicitacao(idColaborador: number, senha: string) {
    return this.prisma.colaborador.update({
      data: {
        senha,
      },
      where: {
        idColaborador,
      },
    });
  }
  async excluirSolicitacao(idColaborador: number) {
    await this.exists(idColaborador);
    return this.prisma.colaborador.delete({
      where: {
        idColaborador,
      },
    });
  }
  async exists(idColaborador: number) {
    if (
      !(await this.prisma.colaborador.count({
        where: {
          idColaborador,
        },
      }))
    ) {
      throw new NotFoundException(`O usuário ${idColaborador} não existe!`);
    }
  }
}
