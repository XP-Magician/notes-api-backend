/* eslint-disable  */
import mongoose from 'mongoose';

export const middleGetById = (req, res, next) => {
  const { id } = req.params;
  const ObjectId = mongoose.Types.ObjectId;
  if (ObjectId.isValid(id)) {
     id === (String) (new ObjectId(id)) ? next() : res.status(400).end('Peticion invalida'); 
  }
   else {
    res.status(400).end('Peticion invalida'); 
   }
};