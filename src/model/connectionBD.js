import mongoose from 'mongoose';
import credentials from '../secure/credentials.js';

mongoose.connect(credentials.MONGO)
    .then(console.log('Database connected'))
    .catch(err=>console.log('Error connecting database ',err));
