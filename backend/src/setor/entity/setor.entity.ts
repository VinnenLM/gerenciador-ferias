import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Setor {
  @PrimaryGeneratedColumn({
    unsigned: true,
  })
  idSetor: number;

  @Column({
    nullable: false,
  })
  nomeSetor: string;

  @Column()
  sigla: string;
}
