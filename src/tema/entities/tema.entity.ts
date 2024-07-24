import { Transform, TransformFnParams } from "class-transformer";
import { IsNotEmpty } from "class-validator";
import { Column, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Entity } from "typeorm/decorator/entity/Entity";
import { Postagem } from "../../postagem/entities/postagem.entity";



@Entity({ name: "tb_temas" })// aqui esatamos criando a tabela temas. as chaves serve para indicar que é uma propriedade.
export class Tema {
    // classe postagem, alguns atributos relacionado abaixo.

    @PrimaryGeneratedColumn() // essa é a chave primaria autoincremental. decorador tem que ficar encima do atributo, nao deixar espaço.
    id: number;

    @Transform(({ value }: TransformFnParams) => value?.trim())
    @IsNotEmpty() // a descricao nao pode ser vazio, tem que ser digitado algo, aqui estamos obrigado o usuario a digitar.
    @Column({ length: 1000, nullable: false })
    descricao: string;

    // este lado é um para muitos, ou seja muitas postagens possui um tema 
    @OneToMany(() => Postagem, (postagem) => postagem.tema) // aqui criamos a calsse bidirecional, que veio da outra classe postagem.entity
    postagem: Postagem[]
}