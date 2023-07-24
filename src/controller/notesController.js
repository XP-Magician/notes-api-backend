import {Note} from '../model/noteModel.js';
import mongoose from 'mongoose';

const conn = mongoose.connection;

export const saveNote = (note)=>{
    let state;
    Note.save(note)
    .then(()=>state=true)
    .catch(()=>state=false)
    .finally(()=>{
        conn.close();
        return state;
    });
};

export const getNotes = ()=>{
    let notes;
    Note.find({})
    .then(res=>notes=res)
    .catch(err=>console.log(err))
    .finally(()=>{
        conn.close();
        console.log(notes);
        return notes;
    });
};

getNotes();