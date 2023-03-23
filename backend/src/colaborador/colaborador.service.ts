import { Injectable } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common/exceptions';
import { PrismaService } from 'src/prisma/prisma.service';
import * as moment from 'moment';

@Injectable()
export class ColaboradorService {
  constructor(private readonly prisma: PrismaService) {}

  async cadastrarColaborador(data) {
    data.dataContratacao = new Date(data.dataContratacao);
    data.gmail = data.gmail ? data.gmail : null;
    data.idGestor = data.idGestor ? data.idGestor : null;
    return this.prisma.colaborador.create({ data });
  }

  async logar(data) {
    return this.prisma.colaborador.findFirst({
      where: {
        matricula: data.matricula,
        senha: data.senha,
      },
    });
  }

  /*async listarTodos() {
    return this.prisma.colaborador.findMany({
      include: {
        setor: true,
        solicitacao: true,
      },
    });
  }

  async listarTodosFerias() {
    const dataAtual = moment(new Date()).format('YYYY/MM/DD');
    const colabFerias = [];
    let countFerias = 0;

    const colaboradores = this.prisma.colaborador.findMany({
      include: {
        setor: true,
        solicitacao: true,
      },
    });

    (await colaboradores).forEach((colab) => {
      if (colab.solicitacao.length > 0) {
        colab.solicitacao.forEach((soli) => {
          if (
            dataAtual >
              moment(new Date(soli.dataInicio)).format('YYYY/MM/DD') &&
            dataAtual < moment(new Date(soli.dataFim)).format('YYYY/MM/DD')
          ) {
            colabFerias.push(colab);
            countFerias++;
          }
        });
      }
    });

    return { colabFerias, countFerias };
  }*/

  async listarTodos() {
    const dataAtual = moment(new Date()).format('YYYY/MM/DD');
    const colabAtivos = [];
    const colabFerias = [];
    let countAtivos = 0;
    let countFerias = 0;

    const colaboradores = this.prisma.colaborador.findMany({
      include: {
        setor: true,
        solicitacao: true,
      },
    });

    (await colaboradores).forEach((colab) => {
      if (colab.solicitacao.length > 0) {
        colab.solicitacao.forEach((soli) => {
          if (
            dataAtual >
              moment(new Date(soli.dataInicio)).format('YYYY/MM/DD') &&
            dataAtual < moment(new Date(soli.dataFim)).format('YYYY/MM/DD')
          ) {
            if (
              !colabFerias.some(
                (col) => col.idColaborador === colab.idColaborador,
              )
            ) {
              colabFerias.push(colab);
              countFerias++;
            }
          }
        });
      } else {
        colabAtivos.push(colab);
        countAtivos++;
      }
    });

    const ativos = colabAtivos.map((colab) => {
      return { ...colab, stats: 'ativo' };
    });

    const ferias = colabFerias.map((colab) => {
      return { ...colab, stats: 'ferias' };
    });

    const todosColaboradores = ferias.concat(ativos);

    return { todosColaboradores, countAtivos, countFerias };
  }

  async buscarColaborador(idColaborador: number) {
    await this.exists(idColaborador);
    return this.prisma.colaborador.findFirst({
      where: {
        idColaborador,
      },
    });
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
