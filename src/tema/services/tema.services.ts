import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, ILike, Repository } from 'typeorm';
import { Tema } from '../entities/tema.entity';

@Injectable()
export class TemaService {
  constructor(
    @InjectRepository(Tema)
    private temaRepository: Repository<Tema>,
  ) {}

  async findAll(): Promise<Tema[]> {
    return await this.temaRepository.find({
      relations: {
        postagem: true,
      },
    });
  }

  async findById(id: number): Promise<Tema> {
    //criou no services, tem que criar na controller
    let tema = await this.temaRepository.findOne({
      where: {
        id,
      },
      relations: {
        postagem: true,
      },
    });
    if (!Tema)
      throw new HttpException('Tema não foi encontrada!', HttpStatus.NOT_FOUND);
    return tema;
  }

  async findByDescricao(descricao: string): Promise<Tema[]> {
    //criou no services, tem que criar na controller
    // o colchete é usado quando se espera mais de um objeto, um array
    return await this.temaRepository.find({
      where: {
        descricao: ILike(`%${descricao}%`),
      },
      relations: {
        postagem: true,
      },
    });
  }

  async create(tema: Tema): Promise<Tema> {
    //criou no services, tem que criar na controller
    return await this.temaRepository.save(tema);
  }

  async update(tema: Tema): Promise<Tema> {
    //criou no services, tem que criar na controller
    let buscaTema = await this.findById(tema.id);
    if (!buscaTema || !tema.id)
      throw new HttpException(
        'O Tema não foi encontrado!',
        HttpStatus.NOT_FOUND,
      );
    return await this.temaRepository.save(tema);
  }

  async delete(id: number): Promise<DeleteResult> {
    //criou no services, tem que criar na controller
    let buscaTema = await this.findById(id);
    if (!buscaTema)
      throw new HttpException('Tema não encontrado!', HttpStatus.NOT_FOUND);
    return await this.temaRepository.delete(id);
  }
}
