import Express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

let notes = [
    {
		id:1,
        content:'Im learning a lot with MiduDev',
		important:true,
        date:'18/07/23'
    },
    {
        id:2,
        content:'I hope to finish with my project',
        important:true,
        date:'18/07/23'
    },
    {
        id:3,
        content:'I am very excited',
        important:true,
        date:'18/07/23'
    }
];





//Middleware para validar datos
const middleData = (req,res,next)=>{
    
    isNaN(Number(req.params.id))
        ? (res.status(400).send('<h1>Peticion invalida</h1>'))
        : (req.params.parsedId=Number(req.params.id),
          next());
};

const middleNote = ( req,res,next)=>{
    let note = req.body;
    if (!note || !note.content ){
        res.status(400).send('<h1>No se creo el recurso</h1>');
    }else{
        req.note = note;
        next();
    }
};


//Sever and global middlewares
const corsOptions = {
    origin:'http://localhost:5173',
    optionsSuccessStatus: 200
};

const app = Express();
app.use(bodyParser.json());
app.use(cors(corsOptions));


// Paths

//GET METHOD
app.get('/',(req,res)=>{
    res.send('<h1>Este es el index</h1>');
});

app.get('/notes',(req,res)=>{
    res.json(notes);
});

app.get('/notes/:id',middleData,(req,res)=>{
    let id = req.params.parsedId;
    let note = notes.find(note=>note.id===id);
    res.status(200).json(note);
});



//POST METHOD
app.post('/notes',middleNote,(req,res)=>{
    let ids = notes.map((nt)=>nt.id);
    notes.push({
        id: Math.max(...ids)+1,
        content:req.note.content,
        important: req.note.important!==undefined?req.note.important:false,
        date: new Date().toUTCString()
        });
    res.status(201).send(notes);
});



//DELETE METHOD
app.delete('/notes/:id',middleData,(req,res)=>{
    let id = req.params.parsedId;
    let filtered_notes = notes.filter(note=>note.id!==id);  

    filtered_notes.length!==notes.length
        ?(res.status(204).json(filtered_notes),notes=filtered_notes)
        :(res.status(304).send('<h1>Sin coincidencias</h1>'));
});


//404 
app.use((req,res)=>{
    res.status(404).send('<h2>¡Lo sentimos! , no hemos podido encontrar el recurso solicitado</h2>');
});



// Puerto y avisos finales
const PORT = process.env.PORT || 3001;
app.listen(PORT,()=>console.log('Server running at : '+PORT));
