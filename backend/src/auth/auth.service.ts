import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Colaborador } from 'src/colaborador/entity/colaborador.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
  ) {}

  async createToken() {
    //return this.jwtService.sign();
  }

  async checkToken(token: string) {
    //return this.jwtService.verify;
  }

  async login(matricula: string, senha: string) {
    const colab = this.prisma.colaborador.findFirst({
      where: {
        matricula,
        senha,
      },
    });

    if (!colab) {
      throw new UnauthorizedException('Matrícula e/ou senha incorretos!');
    }
  }

  async reset(idColaborador: number, senha: string) {
    await this.prisma.colaborador.update({
      where: {
        idColaborador,
      },
      data: {
        senha,
      },
    });
    return true;
  }
}
