import APP_CREDENTIALS from '../secure/credentials.js';
import mongoose from 'mongoose';


mongoose.connect(APP_CREDENTIALS.MONGO)
    .then(()=>console.log('Database connected'))
    .catch(err=>console.log('Error connecting database ',err));




