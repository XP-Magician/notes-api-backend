import './connectionBD.js';
import mongoose from 'mongoose';


const Schema = mongoose.Schema;
const model = mongoose.model;

// Definir esquema a nivel de app
const noteSchema = Schema({
    content:String,
    date: Date,
    important: Boolean
});

//Modelo 
export const Note = model('Note',noteSchema);