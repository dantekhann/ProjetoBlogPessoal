import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Postagem } from './entities/postagem.entity';
import { PostagemController } from './controllers/postagem.controllers';
import { PostagemService } from './services/postagem.services';
import { TemaService } from '../tema/services/tema.services';
import { TemaModule } from '../tema/tema.module';

@Module({
  imports: [TypeOrmModule.forFeature([Postagem]), TemaModule],
  providers: [PostagemService, TemaService],
  controllers: [PostagemController],
  exports: [TypeOrmModule],
})
export class PostagemModule {}

//após executar, para conferir digitar no navegador http://localhost:4000/postagens
