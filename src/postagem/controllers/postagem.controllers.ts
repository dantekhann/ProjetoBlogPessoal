import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { Postagem } from '../entities/postagem.entity';
import { PostagemService } from '../services/postagem.services';

@Controller('/postagens')
export class PostagemController {
  constructor(private readonly postagemService: PostagemService) {}

  @Get()
  @HttpCode(HttpStatus.OK) // Httpe Status 200
  findAll(): Promise<Postagem[]> {
    return this.postagemService.findAll();
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK) // Httpe Status 200
  findById(@Param('id', ParseIntPipe) id: number): Promise<Postagem> {
    //Essa linha faz a conexão entre o id number com o id string do Get
    return this.postagemService.findById(id);
  }

  @Get('/titulo/:titulo') //foi criado um subcaminho // para que não haja problema com o caminho id
  @HttpCode(HttpStatus.OK) // Httpe Status 200
  findByTitulo(@Param('titulo') titulo: string): Promise<Postagem[]> {
    //Essa linha faz a conexão entre o id number com o id string do Get
    return this.postagemService.findByTitulo(titulo);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED) //Http Status 201
  create(@Body() postagem: Postagem): Promise<Postagem> {
    //pega o corpo no formado json e transforma em objeto
    return this.postagemService.create(postagem);
  }

  @Put()
  @HttpCode(HttpStatus.OK) //Http Status 201
  update(@Body() postagem: Postagem): Promise<Postagem> {
    //pega o corpo no formado json e transforma em objeto
    return this.postagemService.update(postagem);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT) // Httpe Status 204
  delete(@Param('id', ParseIntPipe) id: number) {
    //Essa linha faz a conexão entre o id number com o id string do Get
    return this.postagemService.delete(id);
  }

}
