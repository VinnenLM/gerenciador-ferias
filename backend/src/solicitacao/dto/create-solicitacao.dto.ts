import { IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateSolicitacaoDTO {
  @IsString()
  dataSolicitacao: Date;

  @IsString()
  dataInicio: Date;

  @IsString()
  dataFim: Date;

  @IsString()
  status: string;

  @IsOptional()
  @IsString()
  comentarioColab: string;

  @IsOptional()
  @IsString()
  comentarioGestor: string;

  @IsNumber()
  idColaborador: number;
}
