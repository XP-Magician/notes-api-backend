import { Router } from 'express';
import { deleteNote, getNotes, saveNote, updateNote } from '../controller/notesController.js';
import { middleValidateId, middleValidateNote } from '../middlewares/middleNotes.js';
import { middleInspectSubject } from '../middlewares/middleAuthorization.js';
const router = Router();

router.get('/', (req, res) => {
  getNotes({})
    .then(resp => res.json(resp))
    .catch(err => console.log(err));
});

router.get('/:_id', middleValidateId, (req, resp) => {
  const idSearch = req.params._id;
  getNotes({ _id: idSearch })
    .then(response => resp.json(response))
    .catch(err => console.log('ERROR EN GETNOTES; ' + err));
});

// POST METHOD
router.post('/', middleInspectSubject, middleValidateNote, (req, res) => {
  const note = req.body;
  const user = req.params.user;
  saveNote(note, user)
    .then(response => {
      res.json(response);
    }
    )
    .catch((err) => { res.status(400).send(err.message); });
});

// PUT METHOD

router.put('/', middleValidateId, middleValidateNote, (req, resp) => {
  const note = req.body;
  updateNote(note)
    .then(result => resp.status(201).json(result))
    .catch(err => resp.status(400).send(err.message));
});

// DELETE METHOD
router.delete('/:_id', middleValidateId, (req, resp) => {
  const { _id } = req.params;
  deleteNote(_id)
    .then(result => resp.json(result))
    .catch(err => resp.status(400).send(err.message));
});

export default router;
