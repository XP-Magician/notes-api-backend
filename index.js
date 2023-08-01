import {} from 'dotenv/config';
import Express from 'express';
import cors from 'cors';
import { getNotes, saveNote } from './src/controller/notesController.js';
import { middleValidateId, middleValidateNote } from './src/middles/middleNotes.js';

// Server initial config
const app = Express();
app.use(Express.json());
app.use(cors());
app.disable('x-powered-by');

// Paths

// GET METHOD
app.get('/', (req, res) => {
  res.json({ Welcome: 'Greetings, welcome to my API' });
});

app.get('/notes', (req, res) => {
  getNotes({})
    .then(resp => res.json(resp))
    .catch(err => console.log(err));
});

app.get('notes/:id', middleValidateId, (req, resp) => {
  const idSearch = req.params.id;
  getNotes({ _id: idSearch })
    .then(response => resp.json(response))
    .catch(err => console.log(err));
});

// POST METHOD
app.post('/notes', middleValidateNote, (req, res) => {
  const note = req.body;
  saveNote(note)
    .then(response => res.json(response))
    .catch((err) => { res.status(400).send(err.message); });
});

// PUT METHOD

app.put('/notes', middleValidateNote, (req, resp) => {
  const note = req.body;
});

// 404
app.use((req, res) => {
  res.status(404).send('We could not find the resource that you are looking for');
});

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running at : http://localhost:${PORT}`));
