import { Injectable } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common/exceptions';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateColaboradorDTO } from './dto/create-colaborador.dto';

@Injectable()
export class ColaboradorService {
  constructor(private prisma: PrismaService) {}
  async create({
    matricula,
    nome,
    cpf,
    email,
    gmail,
    senha,
    contratacao,
    data_contratacao,
    id_gestor,
  }: CreateColaboradorDTO) {
    return this.prisma.colaborador.create({
      data: {
        matricula: matricula,
        nome: nome,
        cpf: cpf,
        email: email,
        gmail: gmail,
        senha: senha,
        contratacao: contratacao,
        data_contratacao: new Date(data_contratacao),
        dias_disponiveis: 0,
        id_gestor: id_gestor ? id_gestor : null,
      },
    });
  }
  async findAll() {
    return this.prisma.colaborador.findMany({
      include: {
        colaborador: true,
        other_colaborador: true,
      },
    });
  }
  async findOne(id: number) {
    return this.prisma.colaborador.findUnique({
      where: {
        id_colaborador: id,
      },
    });
  }
  async updatePassword(id: number, senha: string) {
    return this.prisma.colaborador.update({
      data: {
        senha: senha,
      },
      where: {
        id_colaborador: id,
      },
    });
  }
  async delete(id: number) {
    await this.exists(id);
    return this.prisma.colaborador.delete({
      where: {
        id_colaborador: id,
      },
    });
  }
  async exists(id: number) {
    if (!(await this.findOne(id))) {
      throw new NotFoundException(`O usuário ${id} não existe!`);
    }
  }
}
