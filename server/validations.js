import { body } from 'express-validator';

export const loginValidator = [
    body('email', 'Неверный формат почты').isEmail(),
    body('password', 'Пароль не должен быть меньше 4 символов').isLength({min : 4})
];

export const registerValidator = [
    body('email', 'Неверный формат почты').isEmail(),
    body('password', 'Пароль не должен быть меньше 4 символов').isLength({min : 4}),
    body('fullName', 'Укажите имя').isLength({min : 3}),
    body('avatarUrl', 'Неверная ссылка на аватарку').optional().isURL(),
];

export const songCreateValidator = [
    body('title', 'Введите название песни').isLength({ min: 3 }).isString(),
    body('author', 'Введите имя исполнителя').isLength({min : 2}).isString(),
    body('favorite', 'Любимая').optional().isBoolean(),
    body('imageUrl', 'Неверная ссылка на изображение').optional().isString(),
];