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

const getUSer = [
  param('uuid').isString().notEmpty().isLength({min: 36, max: 36})
];

const updateUser = [ 
  body('name').isString().optional().isLength({min: 3, max: 20}),
  body('full_name').isString().optional().isLength({min: 10, max: 60}),
  body('password').isString().optional().isLength({min: 6, max: 60}),
  body('admin').isBoolean().optional(),
];

export {
  createUser,
  login,
  deleteAccount,
  getUSer,
  updateUser
}
