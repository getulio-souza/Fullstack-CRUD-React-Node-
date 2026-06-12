const { Router } = require('express');
const { body } = require('express-validator');
const { register } = require('../controllers/auth');
const router = Router();

const validateRegister = [
  body('name').isLength({ min: 4 }).notEmpty().withMessage('Ops! Name is required').trim().escape(),
  body('email').isEmail().notEmpty().withMessage('Ops! Email is required').trim().escape(),
  body('password').isLength({ min: 8 }).withMessage("ops! Password must be at least 8 characters long").trim().escape()
];

router.post('/register', validateRegister, register);

module.exports = router;
