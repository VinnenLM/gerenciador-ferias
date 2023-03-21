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
      gmail: gmail ? gmail : null,
      senha,
      tipoContratacao,
      dataContratacao,
      idGestor: idGestor ? idGestor : null,
      idPerfil,
      idSetor,
    });
  }

  async findAll() {
    return this.colaboradorRepository.find();
  }
  async findOne(idColaborador: number) {
    return this.colaboradorRepository.findOne({
      where: {
        idColaborador,
      },
    });
  }
  async findGestor() {
    return this.colaboradorRepository.find({
      where: {
        idPerfil: 2,
      },
      select: {
        nome: true,
        idColaborador: true,
      },
    });
  }
  async updatePassword(idColaborador: number, senha: string) {
    return this.colaboradorRepository.update(idColaborador, { senha });
  }
  async delete(idColaborador: number) {
    await this.exists(idColaborador);
    return this.colaboradorRepository.delete(idColaborador);
  }
  async exists(idColaborador: number) {
    if (
      !(await this.colaboradorRepository.exist({
        where: {
          idColaborador,
        },
      }))
    ) {
      throw new NotFoundException(`O usuário ${idColaborador} não existe!`);
    }
  }
}
