import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async createToken() {
    //return this.jwtService.sign();
  }

  async checkToken(token: string) {
    //return this.jwtService.verify;
  }

  /*async login(matricula: string, senha: string) {
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

  async reset(id_colaborador: number, senha: string) {
    await this.prisma.colaborador.update({
      where: {
        id_colaborador,
      },
      data: {
        senha,
      },
    });
    return true;
  }*/
}
