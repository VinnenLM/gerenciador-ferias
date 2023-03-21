import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
  JoinTable,
} from 'typeorm';

export enum tipoContratacao {
  CLT = 'CLT',
  PJ = 'PJ',
}

@Entity()
export class Colaborador {
  @PrimaryGeneratedColumn({
    unsigned: true,
  })
  idColaborador: number;

  @Column({
    nullable: false,
  })
  matricula: string;

  @Column({
    nullable: false,
  })
  nome: string;

  @Column({
    nullable: false,
    unique: true,
  })
  cpf: string;

  @Column({
    nullable: false,
  })
  email: string;

  @Column()
  gmail: string;

  @Column({
    nullable: false,
  })
  senha: string;

  @Column({
    type: 'enum',
    enum: tipoContratacao,
  })
  tipoContratacao: tipoContratacao;

  @Column({
    type: 'date',
    nullable: false,
  })
  dataContratacao: string;

  @Column({
    nullable: false,
  })
  diasDisponiveis: number;

  @Column({
    type: 'date',
  })
  ultimoAcesso: string;

  @Column()
  idSetor: number;

  @Column()
  idPerfil: number;

  @Column()
  idGestor: number;

  /*@ManyToOne((type) => Colaborador, (colaborador) => colaborador.geridos)
  gestor: Colaborador;

  @OneToMany((type) => Colaborador, (colaborador) => colaborador.gestor)
  geridos: Colaborador[];*/
}
