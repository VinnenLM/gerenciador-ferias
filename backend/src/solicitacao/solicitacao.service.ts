import { Injectable } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common/exceptions';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SolicitacaoService {
  constructor(private readonly prisma: PrismaService) {}

  async salvarSolicitacao(data) {
    data.dataSolicitacao = new Date(data.dataSolicitacao);
    data.dataInicio = new Date(data.dataInicio);
    data.dataFim = new Date(data.dataFim);
    data.solicitacao13 ? new Date(data.solicitacao13) : null;

    data.statusSolicitacao = 'pendente';

    data.comentarioColab =
      data.comentarioColab !== '' ? data.comentarioColab : null;

    data.comentarioGestor = null;

    console.log(data);

    return this.prisma.solicitacao.create({ data });
  }

  async listarSolicitacoes() {
    return this.prisma.solicitacao.findMany();
  }
  async buscarSolicitacao(idSolicitacao: number) {
    await this.exists(idSolicitacao);
    return this.prisma.solicitacao.findFirst({
      where: {
        idSolicitacao,
      },
    });
  }
  async editarSolicitacao(
    idSolicitacao: number,
    statusSolicitacao: string,
    comentarioGestor: string,
  ) {
    return this.prisma.solicitacao.update({
      data: {
        statusSolicitacao,
        comentarioGestor,
      },
      where: {
        idSolicitacao,
      },
    });
  }
  async excluirSolicitacao(idSolicitacao: number) {
    await this.exists(idSolicitacao);
    return this.prisma.solicitacao.delete({
      where: {
        idSolicitacao,
      },
    });
  }
  async exists(idSolicitacao: number) {
    if (
      !(await this.prisma.solicitacao.count({
        where: {
          idSolicitacao,
        },
      }))
    ) {
      throw new NotFoundException(`O usuário ${idSolicitacao} não existe!`);
    }
  }
}
