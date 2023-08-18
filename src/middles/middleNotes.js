/* eslint-disable  */
import mongoose from 'mongoose';
import { Note } from '../model/noteModel.js';

export const middleValidateId = async (req, res, next) => {
   let data;
   if (Object.keys(req.body).length>0){
      data = req.body;
   }
   else{
      data=req.params;
   }
   const  {_id}  = data;
  console.log(_id);
  const ObjectId = mongoose.Types.ObjectId;
  if (ObjectId.isValid(_id)) {
     _id === (String) (new ObjectId(_id)) ? next() : res.status(400).end('Request doesnt have valid params'); 
  }
   else {
    res.status(400).end('Request doesnt have valid params'); 
   }
};

export const middleValidateNote = async (req, res, next) => {
   const note = req.body;
   try {
      const noteToAdd = new Note({ ...note });
      await noteToAdd.validate() ? next() : res.status(400).end('Request could not be validated, try again');
    } catch (err) {
      res.status(400).end(err.message); 
    }
}
