import {Note} from '../model/noteModel.js';

export const saveNote = async (note)=>{
        !note.important
            ?note.important=false
            :note.important;
        let noteToAdd = new Note({date:new Date(),...note});
        await noteToAdd.validate();
        await noteToAdd.save();
        return noteToAdd;
};


export const getNotes = (filter)=>{
    return new Promise ((resolve,reject)=>{
    Note.find(filter)
        .then(resp =>{
            let content = resp;
            resolve(content);  
        })
        .catch(err=>reject(err));
    });
};
