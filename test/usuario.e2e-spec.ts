import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppModule } from '../src/app.module';
import * as request from 'supertest';

describe('Testes do Módulos Usuário e Auth (e2e)', () => {

  let token: any;
  let usuarioId: any;
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports:[
        TypeOrmModule.forRoot({
        type: "sqlite",
        database: ":memory:",
        entities: [__dirname + "./../src/**/entities/*.entity.ts"],
        synchronize: true,
        dropSchema: true
      }), 
      AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });
  afterAll(async () => {
    await app.close();
  });

  it("01 - Deve Cadastrar um Novo Usuário", async() => {
    const resposta = await request(app.getHttpServer())
    .post('/usuarios/cadastrar')
    .send({
      nome: 'Root',
      usuario: 'root@root.com',
      senha: 'rootroot',
      foto: '-',
    })
    .expect(201);

    usuarioId = resposta.body.id;

  })

  it("02 - Não Deve Cadastrar um Usuário Duplicado", async() => {
    const resposta = await request(app.getHttpServer())
    .post('/usuarios/cadastrar')
    .send({
      nome: 'Root',
      usuario: 'root@root.com',
      senha: 'rootroot',
      foto: '-',
    })
    .expect(400);

})

it("03 - Deve Autenticar um Usuário(Login)", async() => {
  const resposta = await request(app.getHttpServer())
  .post('/usuarios/logar')
  .send({
    usuario: 'root@root.com',
    senha: 'rootroot',
  })
  .expect(200);

  token = resposta.body.token

})

it("04 - Deve Listar todos os Usuários", async() => {
  const resposta = await request(app.getHttpServer())
  .get('/usuarios/all')
  .set('Authorization', `${token}`)
  .expect(200);

})

it("05 - Deve Atualizar os Dados do Usuário", async() => {
  const resposta = await request(app.getHttpServer())
  .put('/usuarios/atualizar')
  .set('Authorization', `${token}`)
  .send({
    id: usuarioId,
    nome: 'Admin',
    usuario: 'root@root.com',
    senha: 'rootroot',
    foto: 'foto.jpg',
  })
  .expect(200)
  .then(resposta => {
    expect("Admin").toEqual(resposta.body.nome);
  });

})

it("06 - Deve Listar apenas um Usuário pelo id", async () => {
  return request(app.getHttpServer())
  .get(`/usuarios/${usuarioId}`)
  .set('Authorization', `${token}`)
  .send({})
  .expect(200)
  
})

});