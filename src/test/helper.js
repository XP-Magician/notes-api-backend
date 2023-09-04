import supertest from 'supertest';
import { app } from '../../index.js';
import { Note } from '../model/noteModel.js';

export const api = supertest(app);

export const initNotes = async () => {
// Esto se hace porque se debe esperar siempre un resultado predecible de los tests
  await Note.deleteMany({});
  const notesToAdd = [
    {
      content: 'The first element',
      important: true,
      date: new Date().toDateString()
    },
    {
      content: 'The SECOND element',
      important: false,
      date: new Date().toDateString()
    }
  ];
  const note1 = new Note(notesToAdd[0]);
  const note2 = new Note(notesToAdd[1]);
  note1.save();
  note2.save();
  return Note.find({});
};
