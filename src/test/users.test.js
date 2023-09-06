// Dependencies
import { api, initUsers, badRequests, initialBdLenght, getId } from './helperUsers.js';
import { expect } from 'chai';

// Tests

// Init BD test
beforeEach(async () => {
  try {
    await initUsers();
  } catch (err) {
    console.log(err);
  }
});

// GET Tests
describe('Users en GET: ', () => {
  it('Sin query params: Devolver todos los users', async () => {
    const length = await initialBdLenght();
    const users = await api.get('/users')
      .expect(200)
      .expect('Content-Type', /application\/json/);
    expect(users._body.length).to.equals(length);
  });

  it('users query params sin matcheo: Devolver JSON Vacio', async () => {
    const users = await api.get('/users?username=pedro')
      .expect(200)
      .expect('Content-Type', /application\/json/);
    expect(users._body.length).to.equals(0);
  });

  it('users query params y matcheo: Devolver JSON unico', async () => {
    const users = await api.get('/users?username=Messi')
      .expect(200)
      .expect('Content-Type', /application\/json/);
    expect(users._body.length).to.equals(1);
  });

  it('users query params de ID (mal formato): Devolver 400', async () => {
    await api.get('/users/64f77e8cd31waaaaa').expect(400);
  });

  it('users query params de ID (buen formato pero sin users): Devolver JSON vacio', async () => {
    const users = await api.get('/users/64f77e8cd31339cd1fcaf1f3')
      .expect(200)
      .expect('Content-Type', /application\/json/);
    expect(users._body.length).to.equals(0);
  });

  it('users query params de ID (buen formato y user existente): Devolver JSON unico', async () => {
    const id = await getId();
    const users = await api.get('/users/' + id)
      .expect(200)
      .expect('Content-Type', /application\/json/);
    expect(Object.keys(users._body).length).greaterThanOrEqual(1);
  });
});

// POST AND PATCH TESTS

describe('Users en POST/PATCH', () => {
  it('users crear con username existente: Devolver 406', async () => {
    const user = badRequests.existentUsername;
    await api.post('/users')
      .send(user)
      .expect(406);
  });

  it('users crear con cumplimiento de parametros: Devolver JSON unico', async () => {
    const user = {
      name: 'Lionel Pessi',
      username: 'Pessi',
      passwordHash: 'ABcd35!!'
    };
    await api.post('/users')
      .send(user)
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  it('users crear con incumplimiento de contrato: Devolver 400', async () => {
    const user = badRequests.badUserBody;
    await api.post('/users')
      .send(user)
      .expect(400);
  });

  it('users resetear pass que no cumple los criterios: Devolver 400', async () => {
    const user = badRequests.badPasswordReq;
    const id = await getId();
    await api.patch('/users/reset/' + id)
      .send(user)
      .expect(400);
  });

  it('users resetear pass que cumple los criterios pero id inexistente: Devolver JSON vacio', async () => {
    const user = badRequests.goodPassword;
    const result = await api.patch('/users/reset/64f88662ea2f4f8b35c207c0')
      .send(user)
      .expect(200)
      .expect('Content-Type', /application\/json/);
    expect((result._body).length).to.lessThan(1);
  });

  it('users resetear pass que cumple los criterios e id: Devolver Pass', async () => {
    const user = badRequests.goodPassword;
    const id = await getId();
    const result = await api.patch('/users/reset/' + id)
      .send(user)
      .expect(200)
      .expect('Content-Type', /application\/json/);
    expect(Object.keys(result._body).length).to.greaterThan(0);
  });

  it('users actualizar con contrato e id correcto: JSON devuelto es diferente en los campos modificados', async () => {
    const user = {
      name: 'Juan cohetes',
      username: 'Messi'
    };
    const id = await getId();
    const response = await api.patch('/users/' + id)
      .send(user)
      .expect(200)
      .expect('Content-Type', /application\/json/);
    expect(response._body.name).to.equals(user.name);
  });
});
