// Express config
import {} from 'dotenv/config';
import Express from 'express';
import cors from 'cors';

// Routers
import notesRouter from './src/routers/notesRouter.js';
import userRouter from './src/routers/userRouter.js';

// Server initial config
const app = Express();
app.use(Express.json());
app.use(cors());
app.disable('x-powered-by');

// Serving static resources with middleware
app.use('/images', Express.static('src/public'));

// Paths
app.use('/notes', notesRouter);
app.use('/users', userRouter);

// 404
app.use((req, res) => {
  res.status(404).send('We could not find the resource that you are looking for');
});

// Server initial config
const PORT = process.env.PORT;
const server = app.listen(PORT, () => console.log(`Server running at : http://localhost:${PORT}`));

export { app, server };
