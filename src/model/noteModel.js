import mongoose from 'mongoose';
import './connectionBD.js';

const Schema = mongoose.Schema;
const model = mongoose.model;

// Definir esquema a nivel de app
const noteSchema = Schema({
    content:String,
    date: Date,
    important: Boolean
},
);

noteSchema.methods.toJSON = function (){
    const noteObject = this.toObject();
    noteObject.id = noteObject._id;
    delete noteObject._id;
    delete noteObject.__v;
    return noteObject;
};


//Modelo 
export const Note = model('Note',noteSchema);