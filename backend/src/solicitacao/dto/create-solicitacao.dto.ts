import {
  IsString,
  IsEmail,
  IsStrongPassword,
  IsNumber,
  IsOptional,
  IsEnum,
} from 'class-validator';

export enum tipoContratacao {
  CLT = 'CLT',
  PJ = 'PJ',
}

export class CreateSolicitacaoDTO {
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

  @IsEnum(tipoContratacao)
  tipoContratacao: tipoContratacao;

  @IsString()
  dataContratacao: Date;

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
