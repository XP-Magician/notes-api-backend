// Dependencies
import { Router } from 'express';
import { findUserById, findUsers, saveUser, updateUser } from '../controller/usersController.js';
import { middleValidateUser, middleUserExists } from '../middlewares/middleUsers.js';
// Router init
const router = Router();

// Paths

// Get users
router.get('/', (req, resp) => {
  findUsers({ ...req.body })
    .then(response => resp.json(response))
    .catch(err => resp.status(400).send(err.message));
});

router.get('/:id', (req, resp) => {
  const userId = req.params.id;
  findUserById(userId)
    .then(response => resp.json(response))
    .catch(err => resp.status(400).send(err.message));
});

// Create user
router.post('/', middleValidateUser, middleUserExists, (req, resp) => {
  saveUser(req.body)
    .then(response => resp.json(response))
    .catch(err => resp.status(400).send(err.message));
});

// Update user
router.patch('/:id', (req, resp) => {
  const userId = req.params.id;
  const { parsedUser } = req.params;
  updateUser(userId, parsedUser)
    .then(response => resp.json(response))
    .catch(err => resp.status(400).send(err.message));
});

export default router;
