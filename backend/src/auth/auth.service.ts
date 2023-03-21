/*import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Colaborador } from 'src/colaborador/entity/colaborador.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(Colaborador)
    private colaboradorRepository: Repository<Colaborador>,
  ) {}

  async createToken() {
    //return this.jwtService.sign();
  }

  async checkToken(token: string) {
    //return this.jwtService.verify;
  }

  async login(matricula: string, senha: string) {
    const colab = this.colaboradorRepository.findOne({
      where: {
        matricula,
        senha,
      },
    });

    if (!colab) {
      throw new UnauthorizedException('Matrícula e/ou senha incorretos!');
    }
  }

  /*async reset(id_colaborador: number, senha: string) {
    await this.prisma.colaborador.update({
      where: {
        id_colaborador,
      },
      data: {
        senha,
      },
    });
    return true;
  }
}*/
