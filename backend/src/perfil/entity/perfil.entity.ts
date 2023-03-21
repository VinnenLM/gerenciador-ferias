import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Perfil {
  @PrimaryGeneratedColumn({
    unsigned: true,
  })
  idPerfil: number;

  @Column({
    nullable: false,
  })
  perfil: string;
}
