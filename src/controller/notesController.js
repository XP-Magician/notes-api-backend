/* eslint-disable no-useless-catch */
import { Note } from '../model/noteModel.js';
import '../model/connectionBD.js';

export const saveNote = async (note) => {
  const important = note.important ?? false;
  note.important = important;
  try {
    const noteToAdd = new Note({ date: new Date(), ...note });
    await noteToAdd.save();
    return noteToAdd;
  } catch (err) {
    throw err;
  }
};

export const updateNote = () => {

};

export const getNotes = (filter) => {
  return new Promise((resolve, reject) => {
    Note.find(filter)
      .then(resp => {
        const content = resp;
        resolve(content);
      })
      .catch(err => reject(err));
  });
};
