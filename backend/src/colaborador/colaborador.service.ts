import { Injectable } from '@nestjs/common';
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
    dias_disponiveis,
    id_gestor,
  }: CreateColaboradorDTO) {
    return this.prisma.colaborador.create({
      data: {
        matricula,
        nome,
        cpf,
        email,
        gmail,
        senha,
        contratacao,
        data_contratacao,
        dias_disponiveis,
        id_gestor,
      },
    });
  }
}
