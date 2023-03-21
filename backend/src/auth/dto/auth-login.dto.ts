import { IsString, IsStrongPassword } from 'class-validator';

export class AuthLoginDTO {
  @IsString()
  matricula: string;

  @IsStrongPassword({
    minLength: 3,
    minNumbers: 0,
    minUppercase: 0,
    minLowercase: 0,
    minSymbols: 0,
  })
  senha: string;
}
