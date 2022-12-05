import express from 'express';
import mongoose from 'mongoose';

import { registerValidator} from "./validations/auth.js";


import checkAuth from './utils/checkAuth.js'
import { dbUrl } from './private.js';

import * as UserController from './controllers/UserController'

mongoose
.connect(dbUrl)
.then(() => console.log('DB OK'))
.catch((err) => console.log('DB error', err));

const app = express();

app.use(express.json());

app.post('/auth/login', UserController.login);

app.post('/auth/register', registerValidator, UserController.register);

app.get('/auth/profile', checkAuth, UserController.profile);

app.listen(8080, (err) =>{
    if (err){
        return console.log(err);
    }

    console.log('Server OK');
})