import express from 'express';
import mongoose from 'mongoose';
import multer from 'multer';

import { registerValidator, loginValidator, songCreateValidator} from "./validations.js";

import checkAuth from './utils/checkAuth.js'
import { dbUrl } from './private.js';

import {login, register, profile} from './controllers/UserController.js';
import { create, getAll, getOne, remove, update } from './controllers/SongController.js';
import handleValidationsErrors from './utils/handleValidationsErrors.js';

mongoose
.connect(dbUrl)
.then(() => console.log('DB OK'))
.catch((err) => console.log('DB error', err));

const app = express();

const storage = multer.diskStorage({
    destination: (_, __, cb) => {
        cb (null, 'uploads');
    },
    filename: (_, file, cb) => {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage });

app.use(express.json());
app.use('/uploads', express.static('uploads'));

app.post('/auth/login',  loginValidator, handleValidationsErrors, login);
app.post('/auth/register',  registerValidator, handleValidationsErrors, register);
app.get('/auth/profile', checkAuth, profile);

app.post('/upload', checkAuth, upload.single('song'), (req, res) => {
    res.json({
        url: `/uploads/${req.file.originalname}`
    });
});

app.get('/songs', getAll);
app.get('/songs/:id', getOne);
app.post('/songs', checkAuth, songCreateValidator, handleValidationsErrors, create);
app.delete('/songs/:id', checkAuth, remove);
app.patch('/songs/:id', songCreateValidator, checkAuth, handleValidationsErrors, update);

app.listen(8080, (err) =>{
    if (err){
        return console.log(err);
    }

    console.log('Server OK');
})