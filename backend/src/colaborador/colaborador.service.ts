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

  async verificarVencimentoAcumuloColaborador(idColaborador: number) {
    const vencimento = await this.verificarVencimentoPeriodo(idColaborador);
    const acumulo = await this.verificarAcumuloPeriodo(idColaborador);
    return { vencimento, acumulo };
  }

  async verificarVencimentoPeriodo(idColaborador: number) {
    let feriasAtrasada = false;
    const colaborador = await this.prisma.colaborador.findUnique({
      where: {
        idColaborador,
      },
    });
    const solicitacoes = await this.prisma.solicitacao.findMany({
      where: {
        idColaborador,
        NOT: {
          statusSolicitacao: 'negado',
        },
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

  async verificarAcumuloPeriodo(idColaborador: number) {
    let acumuloPeriodo = false;
    const colaborador = await this.prisma.colaborador.findUnique({
      where: {
        idColaborador,
      },
    });
    const solicitacoes = await this.prisma.solicitacao.findMany({
      where: {
        idColaborador,
        NOT: {
          statusSolicitacao: 'negado',
        },
      },
    });
    if (solicitacoes.length == 0) {
      if (differenceInMonths(new Date(), colaborador.dataContratacao) >= 35) {
        acumuloPeriodo = true;
      }
    } else {
      solicitacoes.forEach((sol) => {
        differenceInMonths(new Date(), sol.dataSolicitacao) >= 23
          ? (acumuloPeriodo = true)
          : null;
      });
    }
    return acumuloPeriodo;
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

    let todosColaboradores = [];
    todosColaboradores = ferias.concat(ativos);

    for (const colab of todosColaboradores) {
      const acumuloPeriodo = await this.verificarAcumuloPeriodo(
        colab.idColaborador,
      );
      colab.acumuloPeriodo = acumuloPeriodo;
    }

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

    let todosColaboradores = [];
    todosColaboradores = ferias.concat(ativos);

    for (const colab of todosColaboradores) {
      const acumuloPeriodo = await this.verificarAcumuloPeriodo(
        colab.idColaborador,
      );
      colab.acumuloPeriodo = acumuloPeriodo;
    }

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

    const dataContratacao = colaborador.dataContratacao; // data de contratação do colaborador
    const dataAtual = new Date();
    const diferencaAnos =
      dataAtual.getFullYear() - dataContratacao.getFullYear();

    const periodos = []; //todos periodos

    for (let i = 1; i < diferencaAnos; i++) {
      const inicio = new Date(
        dataContratacao.getFullYear() + i,
        dataContratacao.getMonth(),
        dataContratacao.getDate(),
      );
      const fim = new Date(
        dataContratacao.getFullYear() + i + 1,
        dataContratacao.getMonth(),
        dataContratacao.getDate(),
      );
      periodos.push({ inicio, fim });
    }

    return {
      colaborador,
      verificarCLT,
      periodoAtual: periodos.length > 0 ? periodos[periodos.length - 1] : null,
    };
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
  async alterarDiasDisponiveis(data) {
    if (data.diasDisponiveis > 30) {
      throw new NotFoundException(
        `A quantidade de dias deve ser no máximo 30!`,
      );
    } else {
      return this.prisma.colaborador.update({
        data: {
          diasDisponiveis: Number(data.diasDisponiveis),
        },
        where: {
          idColaborador: data.idColaborador,
        },
      });
    }
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
