import {Note} from '../model/noteModel.js';

export const saveNote = (note)=>{
    let state;
    Note.save(note)
    .then(()=>state=true)
    .catch(()=>state=false)
    .finally(()=>{
        //conn.close();
        return state;
    });
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
