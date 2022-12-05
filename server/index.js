import express from 'express';
import mongoose from 'mongoose';

import { registerValidator} from "./validations/auth.js";


import checkAuth from './utils/checkAuth.js'
import { dbUrl } from './private.js';

import {login, register, profile} from './controllers/UserController.js'

mongoose
.connect(dbUrl)
.then(() => console.log('DB OK'))
.catch((err) => console.log('DB error', err));

const app = express();

app.use(express.json());

app.post('/auth/login', login);

app.post('/auth/register', registerValidator, register);

app.get('/auth/profile', checkAuth, profile);

app.listen(8080, (err) =>{
    if (err){
        return console.log(err);
    }

    console.log('Server OK');
})