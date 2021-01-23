const request = require('supertest');
const appTest = require('../src/app');

import Developer from '../src/schemas/Developer'

const developers = [
  {
    nome: 'Caíque Lima',
    sexo: 'M',
    idade: 25,
    hobby: 'Ciclismo',
    dataNascimento: '1995-04-28'
  },
  {
    nome: 'Rogério Lima',
    sexo: 'O',
    idade: 35,
    hobby: 'Corrida',
    dataNascimento: '1985-04-28'
  },
  {
    nome: 'Regina Lima',
    sexo: 'F',
    idade: 20,
    hobby: 'Natação',
    dataNascimento: '2000-04-28'
  }
]

describe('DesenvolvedorController - GET: /developers', () => {
  beforeAll(async () => {
    await Developer.remove({});
    await Developer.insertMany(developers);
  })

  test('deve consultar desenvolvedores sem filtro e retornar todos os registros', async () => {
    const response = await request(appTest)
      .get('/developers?page=1&limit=5');

    expect(response.statusCode).toEqual(200);
    expect(response.body.content).toHaveLength(3);
  })

  test('deve consultar desenvolvedores com idade de 20 anos e retornar apenas um registro', async () => {
    const response = await request(appTest)
      .get('/developers?idade=20&page=1&limit=5');      

    expect(response.statusCode).toEqual(200);
    expect(response.body.content).toHaveLength(1);
  })

  test('deve consultar desenvolvedores com idade 50 de anos e retornar erro por não existir', async () => {
    const response = await request(appTest)
      .get('/developers?idade=50&page=1&limit=5');

    expect(response.statusCode).toEqual(404);
    expect(response.body.errorMessage).toContain('Desenvolvedores não encontratos com o filtro informado.');
    
  })
})

describe('DesenvolvedorController - GET: /developers/:id', () => {
  beforeAll(async () => {
    await Developer.remove({});
    await Developer.insertMany(developers);
  })

  test('deve consultar o id 3 e retornar o desenvolvedor Regina Lima', async () => {
    const developer = await Developer.find();
    
    const response = await request(appTest)
      .get(`/developers/${developer[2]._id}`);
      
    expect(response.statusCode).toEqual(200);
    expect(response.body.nome).toEqual("Regina Lima");
    expect(response.body.sexo).toEqual("F");
    expect(response.body.idade).toEqual(20);
    expect(response.body.hobby).toEqual('Natação');
    expect(response.body.dataNascimento).toEqual('2000-04-28');
  })

  test('deve consultar desenvolvedor com id inexistente e retornar erro', async () => {   
    const response = await request(appTest)
      .get('/developers/123');
      
    expect(response.statusCode).toEqual(404);
    expect(response.body.errorMessage).toContain('Desenvolvedor com o id 123 não encontrato.');
  })
})

describe('DesenvolvedorController - POST: /developers', () => {
  const developer = {
    nome: 'Mario Lima',
    sexo: 'O',
    idade: 30,
    hobby: 'Filmes',
    dataNascimento: '1990-04-28'
  }

  beforeAll(async () => {
    await Developer.remove({});
    await Developer.insertMany(developers);
  })

  test('deve salvar novo desenvolvedor corretamente', async () => {    
    const response = await request(appTest)
      .post(`/developers`).send(developer);
      
    expect(response.statusCode).toEqual(201);
    expect(response.body.nome).toEqual('Mario Lima');
    expect(response.body.sexo).toEqual('O');
    expect(response.body.idade).toEqual(30);
    expect(response.body.hobby).toEqual('Filmes');
    expect(response.body.dataNascimento).toEqual('1990-04-28');
  })

  test('deve retornar erro ao tentar salvar novo desenvolvedor', async () => {   
    const response = await request(appTest)
      .post(`/developers`);
      
    expect(response.statusCode).toEqual(400);
    expect(response.body.errorMessage).toContain('Falha ao salvar o novo desenvolvedor.');
  })
})

describe('DesenvolvedorController - PUT: /developers/:id', () => {
  const developerAtualizado = {
    nome: 'Rogério Lima',
    sexo: 'O',
    idade: 35,
    hobby: 'Corrida e Natação',
    dataNascimento: '1985-04-28',
  }

  beforeAll(async () => {
    await Developer.remove({});
    await Developer.insertMany(developers);
  })

  test('deve atualizar o hobby do desenvolvedor Rogério Lima para Corrida e Natação', async () => { 
    const developer = await Developer.find();

    const response = await request(appTest)
      .put(`/developers/${developer[1]._id}`).send(developerAtualizado);

    const developerUpdated = await Developer.findOne({ _id: developer[1]._id })
      
    expect(response.statusCode).toEqual(201);
    expect(developerUpdated.nome).toEqual('Rogério Lima');
    expect(developerUpdated.hobby).toEqual('Corrida e Natação');
  })

  test('deve retornar erro ao tentar atualizar o cadastro do desenvolvedor Rogério Lima', async () => {   
    const developer = await Developer.find();

    const response = await request(appTest)
      .put(`/developers/${developer[1]._id}`);
      
    expect(response.statusCode).toEqual(400);
    expect(response.body.errorMessage).toContain(`Falha ao editar o desenvolvedor com o id ${developer[1]._id}.`);
  })
})

describe('DesenvolvedorController - DELETE: /developers/:id', () => {  
  beforeAll(async () => {
    await Developer.remove({});
    await Developer.insertMany(developers);
  })

  test('deve ter sucesso ao remover o cadastro', async () => { 
    const developer = await Developer.find();

    const response = await request(appTest)
      .delete(`/developers/${developer[0]._id}`);

    expect(response.statusCode).toEqual(204);
  })

  test('deve dar falha ao remover o cadastro', async () => { 
    const developer = await Developer.find();

    const response = await request(appTest)
      .delete(`/developers/123`);

    expect(response.statusCode).toEqual(400);
    expect(response.body.errorMessage).toContain(`Falha ao remover o desenvolvedor com o id 123.`);
  })
})