import { IsNumber, IsStrongPassword } from 'class-validator';

export class AuthResetDTO {
  @IsNumber()
  id_colaborador: number;

  @IsStrongPassword({
    minLength: 3,
    minNumbers: 0,
    minUppercase: 0,
    minLowercase: 0,
    minSymbols: 0,
  })
  senha: string;
}
