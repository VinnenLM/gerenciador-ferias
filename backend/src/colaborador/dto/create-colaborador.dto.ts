import {
  IsString,
  IsEmail,
  IsStrongPassword,
  IsNumber,
  IsOptional,
} from 'class-validator';

export enum tipoContratacao {
  CLT = 'CLT',
  PJ = 'PJ',
}

export class CreateColaboradorDTO {
  @IsString()
  matricula: string;

  @IsString()
  nome: string;

  @IsString()
  cpf: string;

  @IsEmail()
  email: string;

  @IsEmail()
  @IsOptional()
  gmail: string;

  @IsStrongPassword({
    minLength: 3,
    minNumbers: 0,
    minUppercase: 0,
    minLowercase: 0,
    minSymbols: 0,
  })
  senha: string;

  @IsString()
  tipoContratacao: tipoContratacao;

  @IsString()
  dataContratacao: string;

  @IsNumber()
  diasDisponiveis: number;

  @IsNumber()
  @IsOptional()
  idGestor: number;

  @IsNumber()
  idPerfil: number;

  @IsNumber()
  idSetor: number;
}
