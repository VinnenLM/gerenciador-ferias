import { Injectable } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common/exceptions';
import { CreateColaboradorDTO } from './dto/create-colaborador.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Colaborador } from './entity/colaborador.entity';

@Injectable()
export class ColaboradorService {
  constructor(
    @InjectRepository(Colaborador)
    private colaboradorRepository: Repository<Colaborador>,
  ) {}

  async create({
    matricula,
    nome,
    cpf,
    email,
    gmail,
    senha,
    tipoContratacao,
    dataContratacao,
    idGestor,
    idPerfil,
    idSetor,
  }: CreateColaboradorDTO) {
    return this.colaboradorRepository.create({
      matricula,
      nome,
      cpf,
      email,
      gmail,
      senha,
      tipoContratacao,
      dataContratacao,
      idGestor,
      idPerfil,
      idSetor,
    });
  }

  /*async findAll() {
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
  async findGestor() {
    return this.prisma.colaborador.findMany({
      where: {
        id_perfil: 2,
      },
      select: {
        nome: true,
        id_colaborador: true,
      },
    });
  }
  async updatePassword(id_colaborador: number, senha: string) {
    return this.prisma.colaborador.update({
      data: {
        senha: senha,
      },
      where: {
        id_colaborador: id_colaborador,
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
  }*/
}
