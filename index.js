import {} from 'dotenv/config';
import Express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { getNotes, saveNote } from './src/controller/notesController.js';
import { middleGetById } from './src/middles/middleNotes.js';

// Server initial config
const app = Express();
app.use(bodyParser.json());
app.use(cors());

// Paths

// GET METHOD
app.get('/', (req, res) => {
  getNotes({})
    .then(resp => res.json(resp))
    .catch(err => console.log(err));
});

app.get('/:id', middleGetById, (req, resp) => {
  const idSearch = req.params.id;
  getNotes({ _id: idSearch })
    .then(response => resp.json(response))
    .catch(err => console.log(err));
});

// POST METHOD
app.post('/notes', (req, res) => {
  const note = req.body;
  saveNote(note)
    .then(response => res.json(response))
    .catch(error => res.status(400).send(error));
});

// 404
app.use((req, res) => {
  res.status(404).send('<h2>¡Lo sentimos sr/a! , no hemos podido encontrar el recurso solicitado</h2>');
});

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running at : http://localhost:${PORT}`));
