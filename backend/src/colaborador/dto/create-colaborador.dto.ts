import { contrato } from '@prisma/client';
import { Transform } from 'class-transformer';
import {
  IsString,
  IsDate,
  IsEmail,
  IsStrongPassword,
  IsNumber,
  IsIn,
  IsOptional,
} from 'class-validator';

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

  @IsIn(['CLT', 'PJ'])
  @IsString()
  contratacao: contrato;

  @IsDate()
  data_contratacao: Date;

  @IsNumber()
  dias_disponiveis: number;

  @IsNumber()
  id_gestor: number;
}
