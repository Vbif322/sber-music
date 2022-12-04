import { body } from 'express-validator';

export const registerValidator = [
    body('email', 'Неверный формат почты').isEmail(),
    body('password', 'Пароль не должен быть меньше 4 символов').isLength({min : 4}),
    body('fullName', 'Укажите имя').isLength({min : 3}),
    body('avatarUrl', 'Неверная ссылка на аватарку').optional().isURL(),
];