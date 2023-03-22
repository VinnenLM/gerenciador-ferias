import { IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateSolicitacaoDTO {
  @IsString()
  dataSolicitacao: string;

  @IsString()
  dataInicio: string;

  @IsString()
  dataFim: string;

  @IsOptional()
  @IsString()
  comentarioColab: string;

  @IsOptional()
  @IsString()
  solicitacao13: string;

  @IsNumber()
  idColaborador: number;
}
