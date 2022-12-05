import express from 'express';
import mongoose from 'mongoose';

import { registerValidator, loginValidator, songCreateValidator} from "./validations.js";

import checkAuth from './utils/checkAuth.js'
import { dbUrl } from './private.js';

import {login, register, profile} from './controllers/UserController.js';
import { create, getAll, getOne, remove, update } from './controllers/SongController.js';

mongoose
.connect(dbUrl)
.then(() => console.log('DB OK'))
.catch((err) => console.log('DB error', err));

const app = express();

app.use(express.json());

app.post('/auth/login', loginValidator, login);
app.post('/auth/register', registerValidator, register);
app.get('/auth/profile', checkAuth, profile);

app.get('/songs', getAll);
app.get('/songs/:id', getOne);
app.post('/songs', checkAuth, songCreateValidator, create);
app.delete('/songs/:id', checkAuth, remove);
app.patch('/songs/:id', checkAuth, update);

app.listen(8080, (err) =>{
    if (err){
        return console.log(err);
    }

    console.log('Server OK');
})