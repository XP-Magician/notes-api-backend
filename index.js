import {} from 'dotenv/config';
import Express from 'express';
import * as Sentry from '@sentry/node';
import cors from 'cors';
import { deleteNote, getNotes, saveNote, updateNote } from './src/controller/notesController.js';
import { middleValidateId, middleValidateNote } from './src/middles/middleNotes.js';

// Server initial config
const app = Express();

// Sentry init
Sentry.init({
  dsn: process.env.DSN_SENTRY,
  integrations: [
    // enable HTTP calls tracing
    new Sentry.Integrations.Http({
      tracing: true
    }),
    // enable Express.js middleware tracing
    new Sentry.Integrations.Express({
      app
    })
  ],
  // Performance Monitoring
  tracesSampleRate: 1.0 // Capture 100% of the transactions, reduce in production!,
});

app.use(Express.json());
app.use(cors());
app.disable('x-powered-by');
app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.tracingHandler());
// Serving static resources with middleware
app.use('/images', Express.static('src/public'));
app.use(Sentry.Handlers.errorHandler());
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

app.get('/notes/:_id', middleValidateId, (req, resp) => {
  const idSearch = req.params._id;
  getNotes({ _id: idSearch })
    .then(response => resp.json(response))
    .catch(err => console.log(err));
});

app.get('/debug-sentry', function mainHandler (req, res) {
  throw new Error('My first Sentry error!');
});

// POST METHOD
app.post('/notes', middleValidateNote, (req, res) => {
  const note = req.body;
  saveNote(note)
    .then(response => res.json(response))
    .catch((err) => { res.status(400).send(err.message); });
});

// PUT METHOD

app.put('/notes', middleValidateId, middleValidateNote, (req, resp) => {
  const note = req.body;
  updateNote(note)
    .then(result => resp.status(201).json(result))
    .catch(err => resp.status(400).send(err.message));
});

// DELETE METHOD
app.delete('/notes/:_id', middleValidateId, (req, resp) => {
  const { _id } = req.params;
  deleteNote(_id)
    .then(result => resp.json(result))
    .catch(err => resp.status(400).send(err.message));
});

// 404
app.use((req, res) => {
  res.status(404).send('We could not find the resource that you are looking for');
});
app.use(Sentry.Handlers.errorHandler());

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running at : http://localhost:${PORT}`));

export default app;
