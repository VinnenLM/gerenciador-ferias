import { Injectable } from '@nestjs/common';
import {
  BadRequestException,
  NotFoundException,
} from '@nestjs/common/exceptions';
import { Prisma, solicitacao } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { format, differenceInDays, parseISO, addDays } from 'date-fns';

@Injectable()
export class SolicitacaoService {
  constructor(private readonly prisma: PrismaService) {}

  async salvarSolicitacao(data) {
    let quinzena = false;

    const colab = await this.prisma.colaborador.findUnique({
      where: {
        idColaborador: data.idColaborador,
      },
    });

    const solicitacoes = await this.prisma.solicitacao.findMany({
      where: {
        AND: [
          {
            idColaborador: colab.idColaborador,
          },
          {
            dataSolicitacao: {
              gte: new Date(`${new Date().getFullYear()}-01-01`),
              lte: new Date(`${new Date().getFullYear()}-12-31`),
            },
          },
          {
            NOT: {
              statusSolicitacao: 'negado',
            },
          },
        ],
      },
    });

    const qntDiasAtual =
      differenceInDays(parseISO(data.dataFim), parseISO(data.dataInicio)) + 1;

    //verificar quinzena
    if (solicitacoes.length > 0) {
      solicitacoes.forEach((sol) => {
        const qntDias = differenceInDays(sol.dataFim, sol.dataInicio) + 1;
        qntDias === 15 ? (quinzena = true) : null;
      });
    }

    const valido =
      quinzena ||
      (colab.diasDisponiveis > 15 &&
        colab.diasDisponiveis - qntDiasAtual >= 15) ||
      qntDiasAtual == 15 ||
      (!quinzena && colab.diasDisponiveis == 15 && qntDiasAtual == 15);

    const erro1 =
      colab.diasDisponiveis == 20 && qntDiasAtual != 15 && qntDiasAtual >= 10;

    const erro2 = colab.diasDisponiveis == 15 && qntDiasAtual < 15 && !quinzena;

    const erro3 = colab.diasDisponiveis >= 25 && qntDiasAtual > 15;

    if (valido) {
      console.log('certo');
    } else if (erro1 || erro2 || erro3) {
      throw new BadRequestException(
        `Necessário que o preríodo seja de 15 dias!`,
      );
    } else {
      throw new BadRequestException(`Erro inesperado`);
    }

    const decrementar = differenceInDays(
      parseISO(data.dataFim),
      parseISO(data.dataInicio),
    );

    const dataContratacao = new Date(colab.dataContratacao);
    const dataSolicitacao = new Date(data.dataSolicitacao);
    const dataDiff =
      (dataSolicitacao.getTime() - dataContratacao.getTime()) /
      (1000 * 3600 * 24 * 30);

    if (dataDiff >= 12) {
      await this.prisma.colaborador.update({
        data: {
          diasDisponiveis: colab.diasDisponiveis - (decrementar + 1),
        },
        where: {
          idColaborador: colab.idColaborador,
        },
      });

      data.statusSolicitacao = 'pendente';
      data.comentarioGestor = null;

      return this.prisma.solicitacao.create({ data });
    } else {
      throw new BadRequestException(
        `O usuário precisa completar 1 ano para solicitar férias!`,
      );
    }
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
      Prisma.sql`SELECT Solicitacao.*, Colaborador.nome from Solicitacao JOIN Colaborador ON Solicitacao."idColaborador" = Colaborador."idColaborador" WHERE Colaborador."idGestor" = ${data.idGestor} order by "idSolicitacao" desc`,
    );
  }
  async editarSolicitacao(
    idSolicitacao: number,
    statusSolicitacao: string,
    comentarioGestor: string,
  ) {
    if (statusSolicitacao == 'negado') {
      const solicitacao = await this.prisma.solicitacao.findUnique({
        where: {
          idSolicitacao: idSolicitacao,
        },
      });
      const decrementar = differenceInDays(
        solicitacao.dataFim,
        solicitacao.dataInicio,
      );
      const colab = await this.prisma.colaborador.findUnique({
        where: {
          idColaborador: solicitacao.idColaborador,
        },
      });
      await this.prisma.colaborador.update({
        data: {
          diasDisponiveis: colab.diasDisponiveis + decrementar + 1,
        },
        where: {
          idColaborador: solicitacao.idColaborador,
        },
      });
    }

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
  async solicitacoesPorMeses(data) {
    const solicitacoes: solicitacao[] = await this.prisma.$queryRaw(
      Prisma.sql`SELECT Solicitacao.*, Colaborador.nome from Solicitacao JOIN Colaborador ON Solicitacao."idColaborador" = Colaborador."idColaborador" WHERE Colaborador."idGestor" = ${data.idGestor} and Solicitacao."statusSolicitacao" = 'aprovado'`,
    );
    const mesesDoAno = {};
    for (let mes = 0; mes < 12; mes++) {
      const nomeMes = format(new Date(2022, mes, 1), 'MMM');
      mesesDoAno[nomeMes] = 0;
    }
    solicitacoes.forEach((solicitacao) => {
      const nomeMes = format(addDays(solicitacao.dataInicio, 1), 'MMM');
      mesesDoAno[nomeMes]++;
    });
    const mesesDoAnoArray = Object.entries(mesesDoAno).map(
      ([name, FeriasPorMes]) => ({
        name,
        'Colaboradores de férias por mês': FeriasPorMes,
      }),
    );
    return mesesDoAnoArray;
  }
}
