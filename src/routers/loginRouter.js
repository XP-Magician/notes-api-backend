// Dependencies
import { Router } from 'express';
import { logUser } from '../controller/loginController.js';
import { middleValidateData } from '../middlewares/middleLogin.js';

// Init consts
const router = Router();

// Paths

// POST paths
router.post('/', middleValidateData, (req, resp) => {
  logUser(req.body)
    .then(response => resp.json(response))
    .catch(err => resp.status(400).end(err.message));
});

export default router;
