import app from '../../index.js';
import supertest from 'supertest';

const api = supertest(app);

describe('las notas son retornadas como JSON', () => {
  it('Ruta GET/notes', () => {
    api.get('/notes')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });
});
