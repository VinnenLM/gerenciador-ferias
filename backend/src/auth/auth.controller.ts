import { Body, Controller, Post, Get } from '@nestjs/common';
import { AuthLoginDTO } from './dto/auth-login.dto';
import { ColaboradorService } from 'src/colaborador/colaborador.service';
import { AuthService } from './auth.service';
import { AuthResetDTO } from './dto/auth-reset.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly colaboradorService: ColaboradorService,
    private readonly authService: AuthService,
  ) {}

  @Post('login')
  async login(@Body() { matricula, senha }: AuthLoginDTO) {
    return this.authService.login(matricula, senha);
  }

  @Post('reset')
  async reset(@Body() { id_colaborador, senha }: AuthResetDTO) {
    return this.authService.reset(id_colaborador, senha);
  }
}
