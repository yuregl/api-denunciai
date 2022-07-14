import { body, param } from 'express-validator';

const createUser = [
  body('email').isString().notEmpty().isEmail().isLength({min: 10, max: 60}),
  body('name').isString().notEmpty().isLength({min: 3, max: 20}),
  body('full_name').isString().notEmpty().isLength({min: 10, max: 60}),
  body('password').isString().notEmpty().isLength({min: 6, max: 60}),
  body('admin').isBoolean().optional(),
];

const login = [
  body('email').isString().notEmpty().isEmail().isLength({min: 10, max: 60}),
  body('password').isString().notEmpty().isLength({min: 6, max: 60}),
]

const deleteAccount = [
  param('uuid').isString().notEmpty().isLength({min: 36, max: 36})
];

export {
  createUser,
  login,
  deleteAccount
}
