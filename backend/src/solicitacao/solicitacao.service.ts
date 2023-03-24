import { Injectable } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common/exceptions';
import { Prisma, solicitacao } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SolicitacaoService {
  constructor(private readonly prisma: PrismaService) {}

  async salvarSolicitacao(data) {
    //data.dataSolicitacao = new Date(data.dataSolicitacao);
    //data.dataInicio = new Date(data.dataInicio);
    //data.dataFim = new Date(data.dataFim);
    //data.solicitacao13 !== null ? new Date(data.solicitacao13) : null;

    data.statusSolicitacao = 'pendente';

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
      include: {
        colaborador: true,
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
  async buscarCountSolicitacoesPorGestor(data) {
    let pendentes = 0;
    let aprovados = 0;
    let negados = 0;
    const solicitacoes: solicitacao[] = await this.prisma.$queryRaw(
      Prisma.sql`SELECT Solicitacao.*, Colaborador.nome from Solicitacao JOIN Colaborador ON Solicitacao."idColaborador" = Colaborador."idColaborador" WHERE Colaborador."idGestor" = ${data.idGestor}`,
    );
    (await solicitacoes).forEach((soli) => {
      if (soli.statusSolicitacao == 'aprovado') {
        aprovados++;
      } else if (soli.statusSolicitacao == 'negado') {
        negados++;
      } else {
        pendentes++;
      }
    });
    return {
      pendentes,
      aprovados,
      negados,
      total: pendentes + aprovados + negados,
    };
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
