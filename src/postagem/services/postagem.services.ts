import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, ILike, Repository } from 'typeorm';
import { Postagem } from '../entities/postagem.entity';
import { TemaService } from '../../tema/services/tema.services';

@Injectable()
export class PostagemService {
  constructor(
    @InjectRepository(Postagem)
    private postagemRepository: Repository<Postagem>,
    private TemaService: TemaService,
  ) {}

  async findAll(): Promise<Postagem[]> {
    //SELECT * FROM tb_postagens
    return await this.postagemRepository.find({
      relations: {
        tema: true,
        usuario: true,
      },
    });
  }

  async findById(id: number): Promise<Postagem> {
    //criou no services, tem que criar na controller
    let buscaPostagem = await this.postagemRepository.findOne({
      where: {
        id,
      },
      relations: {
        tema: true,
        usuario: true,
      },
    });
    if (!buscaPostagem)
      throw new HttpException(
        'Postagem não foi encontrada!',
        HttpStatus.NOT_FOUND,
      );
    return buscaPostagem;
  }

  async findByTitulo(titulo: string): Promise<Postagem[]> {
    //criou no services, tem que criar na controller
    // o colchete é usado quando se espera mais de um objeto, um array
    return await this.postagemRepository.find({
      where: {
        titulo: ILike(`%${titulo}%`),
      },
      relations: {
        tema: true,
        usuario: true,
      },
    });
  }

  async create(postagem: Postagem): Promise<Postagem> {
    //criou no services, tem que criar na controller
    if (postagem.tema) {
      let tema = await this.TemaService.findById(postagem.tema.id);
      if (!tema)
        throw new HttpException('Tema não encontrado', HttpStatus.NOT_FOUND);
      return await this.postagemRepository.save(postagem);
    }
    return await this.postagemRepository.save(postagem);
  }

  async update(postagem: Postagem): Promise<Postagem> {
    //criou no services, tem que criar na controller
    let buscaPostagem = await this.findById(postagem.id);
    if (!buscaPostagem || !postagem.id)
      throw new HttpException(
        'A Postagem não foi encontrada!',
        HttpStatus.NOT_FOUND,
      );
    if (postagem.tema) {
      let tema = await this.TemaService.findById(postagem.tema.id);
      if (!tema)
        throw new HttpException('Tema não encontrado', HttpStatus.NOT_FOUND);
      return await this.postagemRepository.save(postagem);
    }
    return await this.postagemRepository.save(postagem);
  }

  async delete(id: number): Promise<DeleteResult> {
    //criou no services, tem que criar na controller
    let buscaPostagem = await this.findById(id);
    if (!buscaPostagem)
      throw new HttpException(
        'Postagem não foi encontrada!',
        HttpStatus.NOT_FOUND,
      );
    return await this.postagemRepository.delete(id);
  }
}
