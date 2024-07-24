import { Transform, TransformFnParams } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';
import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Tema } from '../../tema/entities/tema.entity';

@Entity({ name: 'tb_postagens' }) // Criando a tabela
export class Postagem {
  @PrimaryGeneratedColumn() // Chave Primária Autoincremental
  id: number;

  @Transform(({ value }: TransformFnParams) => value?.trim()) //bloquer apenas espaços em branco
  @IsNotEmpty() // Não Aceitar Título Vazio
  @Column({ length: 100, nullable: false }) // Definir o tamanho e não aceitar valor nulo
  titulo: string;

  @Transform(({ value }: TransformFnParams) => value?.trim())
  @IsNotEmpty()
  @Column({ length: 1000, nullable: false })
  texto: string;

  @UpdateDateColumn() //A data e a hora serão preenchidas automaticamente
  data: Date;

  @ManyToOne(() => Tema, (tema) => tema.postagem, {
    onDelete: 'CASCADE',
  })
  tema: Tema;
}
