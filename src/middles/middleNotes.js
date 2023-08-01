/* eslint-disable  */
import mongoose from 'mongoose';
import { Note } from '../model/noteModel.js';

export const middleValidateId = async (req, res, next) => {
  const { id } = req.params;
  const ObjectId = mongoose.Types.ObjectId;
  if (ObjectId.isValid(id)) {
     id === (String) (new ObjectId(id)) ? next() : res.status(400).end('Request doesnt have valid params'); 
  }
   else {
    res.status(400).end('Request doesnt have valid params'); 
   }
};

export const middleValidateNote = async (req, res, next) => {
   const note = req.body;
   try {
      const noteToAdd = new Note({ ...note });
      !await noteToAdd.validate() ? next() : res.status(400).end('Request could not be validated, try again');
    } catch (err) {
      res.status(400).end(err.message); 
    }
}
