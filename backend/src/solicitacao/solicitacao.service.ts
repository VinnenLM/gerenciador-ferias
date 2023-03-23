import { Injectable } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common/exceptions';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SolicitacaoService {
  constructor(private readonly prisma: PrismaService) {}

  async salvarSolicitacao(data) {
    data.dataSolicitacao = new Date(data.dataSolicitacao);
    data.dataInicio = new Date(data.dataInicio);
    data.dataFim = new Date(data.dataFim);
    data.solicitacao13 = new Date(data.solicitacao13);

    data.statusSolicitacao = 'pendente';

    data.comentarioColab =
      data.comentarioColab !== '' ? data.comentarioColab : null;

    data.comentarioGestor = null;

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
  async buscarMinhasSolicitacoes(data) {
    return this.prisma.solicitacao.findMany({
      where: {
        idColaborador: data.idColaborador,
      },
    });
  }
  async buscarSolicitacoesPorGestor(data) {
    return this.prisma.$queryRaw(
      Prisma.sql`SELECT Solicitacao.*, Colaborador.nome from Solicitacao JOIN Colaborador ON Solicitacao."idColaborador" = Colaborador."idColaborador" WHERE Colaborador."idGestor" = ${data.idGestor}`,
    );
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
