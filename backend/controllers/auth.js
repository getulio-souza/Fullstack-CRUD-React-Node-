const { validationResult } = require('express-validator');
const db = require('../models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { where } = require('sequelize');

require('dotenv').config();
const User = db.User;

exports.register = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: 'error',
      msg: 'Validation error',
      errors: errors.array()
    });
  }

  try {
    const { name, email, password } = req.body;

    //check if the user with given email already exists
    const existingUser = await User.findOne({ where: { email } });

    if (existingUser) {
      return res.status(409).json({
        status: 'error',
        msg: 'user with this email already exists'
      })
    }

    //hash the password
    const hashedPassword = await User.create({
      name,
      email,
      password: hashedPassword
    })

    //generate a JWT token 
    const token = jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: process.env.JWT_EXPIRATION_TIME
      }
    );

    return res.status(201).json({
      status: 'success',
      msg: 'User created successfully',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        token,
      },
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: 'error',
      msg: 'Internal server error',
      errors: error.message,
    });
  }
};