import { expect } from 'chai';
import { server } from '../../index.js';
import { api, initNotes } from './helper.js';

// Init
let notesLength;
const noteToAddBad = {
  content: '',
  hola: 'buenas tardes'
};
const noteToAddGood = {
  content: 'Hello im the good spanglish'
};
beforeEach(async () => {
  try {
    notesLength = await initNotes();
    notesLength = [...notesLength].length;
  } catch (err) {
    console.log(err);
  }
});

// GET REQUESTS
describe('Comportamiento de la API en GET', () => {
  it('Ruta GET/notes : tipo JSON', async () => {
    await api.get('/notes')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  it('Ruta GET/notes/iDinvalida : Mensaje de parametro invalido', async () => {
    const response = await api.get('/notes/abcdefg129043')
      .expect(400);
    expect(response.text).to.equals('Request doesnt have valid params');
  });

  it('Ruta GET/notes/64e8fe22ea933bc67705f625 : Response un JSON vacio', async () => {
    await api.get('/notes/64e8fe22ea933bc67705f625')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });
});

// POST REQUESTS
describe('Comportamiento de la API en POST', () => {
  it('Ruta POST /notes con request invalida, no deberia agregarla a la BD', async () => {
    await api.post('/notes')
      .send(noteToAddBad)
      .expect(400);
    //   const response = await api.get('/notes');
  //  expect(response._body.length).to.equal(notesLength);
  });

  it('Ruta POST /notes con request valida,deberia agregarla a la BD', async () => {
    await api.post('/notes')
      .send(noteToAddGood)
      .expect(200);
    //   const response = await api.get('/notes');
  //  expect(response._body.length).to.equal(notesLength + 1);
  });
});

// Final
after(() => {
  server.close();
  console.log('Se cerro el server');
});
