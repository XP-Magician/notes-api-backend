import { Note } from '../model/noteModel.js';
import '../model/connectionBD.js';
import mongoose from 'mongoose';

export const saveNote = async (note) => {
  const important = note.important ?? false;
  note.important = important;
  const noteToAdd = new Note({ date: new Date(), ...note });
  await noteToAdd.validate();
  await noteToAdd.save();
  return noteToAdd;
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
