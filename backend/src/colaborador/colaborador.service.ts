import { Injectable } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common/exceptions';
import { PrismaService } from 'src/prisma/prisma.service';
import { differenceInMonths } from 'date-fns';
import { colaborador, Prisma } from '@prisma/client';

@Injectable()
export class ColaboradorService {
  constructor(private readonly prisma: PrismaService) {}

  async cadastrarColaborador(data) {
    try {
      data.cpf = data.cpf.replace(/\D/g, '');
      data.dataContratacao = new Date(data.dataContratacao);
      data.gmail = data.gmail ? data.gmail : null;
      data.idGestor = data.idGestor ? data.idGestor : null;
      return this.prisma.colaborador.create({ data });
    } catch (e) {
      return { error: e.message };
    }
  }

  async logar(data) {
    return this.prisma.colaborador.findFirst({
      where: {
        matricula: data.matricula,
        senha: data.senha,
      },
      include: {
        colaborador: true,
      },
    });
  }

  async verificarAtrasoFerias(idColaborador: number) {
    let feriasAtrasada = false;
    const colaborador = await this.prisma.colaborador.findUnique({
      where: {
        idColaborador,
      },
    });
    const solicitacoes = await this.prisma.solicitacao.findMany({
      where: {
        idColaborador,
      },
    });
    if (solicitacoes.length == 0) {
      if (differenceInMonths(new Date(), colaborador.dataContratacao) >= 23) {
        feriasAtrasada = true;
      }
    } else {
      solicitacoes.forEach((sol) => {
        differenceInMonths(new Date(), sol.dataSolicitacao) >= 11
          ? (feriasAtrasada = true)
          : null;
      });
    }
    return feriasAtrasada;
  }

  async listarTodos() {
    const colabFerias: colaborador[] = await this.prisma.$queryRaw(
      Prisma.sql`SELECT Colaborador.*, setor."nomeSetor"
      FROM Colaborador
      LEFT JOIN Solicitacao ON Colaborador."idColaborador" = Solicitacao."idColaborador"
      LEFT JOIN Setor ON Colaborador."idSetor" = Setor."idSetor"
      WHERE NOW() BETWEEN Solicitacao."dataInicio" AND Solicitacao."dataFim" AND Solicitacao."statusSolicitacao" = 'aprovado'
      ORDER BY Colaborador."idColaborador" DESC;`,
    );

    const colabAtivos: colaborador[] = await this.prisma.$queryRaw(
      Prisma.sql`SELECT Colaborador.*, Setor."nomeSetor"
      FROM Colaborador
      LEFT JOIN Setor ON Colaborador."idSetor" = Setor."idSetor"
      WHERE Colaborador."idColaborador" NOT IN (
        SELECT "idColaborador"
        FROM Solicitacao
        WHERE NOW() BETWEEN "dataInicio" AND "dataFim"
          AND "statusSolicitacao" = 'aprovado'
      )
      ORDER BY Colaborador."idColaborador" DESC;
      `,
    );

    const ativos = colabAtivos.map((colab) => {
      return { ...colab, stats: 'ativo' };
    });

    const ferias = colabFerias.map((colab) => {
      return { ...colab, stats: 'ferias' };
    });

    const todosColaboradores = ferias.concat(ativos);

    return {
      todosColaboradores,
      countAtivos: colabAtivos.length,
      countFerias: colabFerias.length,
    };
  }

  async listarTodosPorGestor(data) {
    const colabFerias: colaborador[] = await this.prisma.$queryRaw(
      Prisma.sql`SELECT Colaborador.*, setor."nomeSetor"
      FROM Colaborador
      LEFT JOIN Solicitacao ON Colaborador."idColaborador" = Solicitacao."idColaborador"
      LEFT JOIN Setor ON Colaborador."idSetor" = Setor."idSetor"
      WHERE (NOW() BETWEEN Solicitacao."dataInicio" AND Solicitacao."dataFim" AND Solicitacao."statusSolicitacao" = 'aprovado') AND Colaborador."idGestor" = ${data.idGestor}
      ORDER BY Colaborador."idColaborador" DESC;`,
    );

    const colabAtivos: colaborador[] = await this.prisma.$queryRaw(
      Prisma.sql`SELECT Colaborador.*, Setor."nomeSetor"
      FROM Colaborador
      LEFT JOIN Setor ON Colaborador."idSetor" = Setor."idSetor"
      WHERE Colaborador."idColaborador" NOT IN (
        SELECT "idColaborador"
        FROM Solicitacao
        WHERE NOW() BETWEEN "dataInicio" AND "dataFim"
          AND "statusSolicitacao" = 'aprovado'
      )
      AND Colaborador."idGestor" = ${data.idGestor}
      ORDER BY Colaborador."idColaborador" DESC;
      `,
    );

    const ativos = colabAtivos.map((colab) => {
      return { ...colab, stats: 'ativo' };
    });

    const ferias = colabFerias.map((colab) => {
      return { ...colab, stats: 'ferias' };
    });

    const todosColaboradores = ferias.concat(ativos);

    return {
      todosColaboradores,
      countAtivos: colabAtivos.length,
      countFerias: colabFerias.length,
    };
  }

  async buscarColaborador(idColaborador: number) {
    let verificarCLT = false;
    const colaborador = await this.prisma.colaborador.findUnique({
      where: {
        idColaborador,
      },
      include: {
        setor: true,
        solicitacao: true,
      },
    });
    colaborador.solicitacao.forEach((sol) => {
      sol.solicitacao13 != null && sol.statusSolicitacao != 'negado'
        ? (verificarCLT = true)
        : null;
    });
    return { colaborador, verificarCLT };
  }
  async listarGestores() {
    return this.prisma.colaborador.findMany({
      where: {
        idPerfil: 2,
      },
      select: {
        nome: true,
        idColaborador: true,
      },
    });
  }
  async editarSenha(idColaborador: number, senha: string) {
    return this.prisma.colaborador.update({
      data: {
        senha,
      },
      where: {
        idColaborador,
      },
    });
  }
  async excluirColaborador(idColaborador: number) {
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
