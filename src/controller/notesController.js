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

export const updateNote = async (note) => {
  try {
    const { _id, ...content } = note;
    return await Note.findByIdAndUpdate(_id, content, { new: true });
  } catch (err) {
    throw err;
  }
};

export const deleteNote = async (noteId) => {
  try {
    return await Note.findByIdAndDelete(noteId);
  } catch (err) {
    throw err;
  }
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
