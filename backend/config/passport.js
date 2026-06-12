const { ExtractJwt, Strategy: JwStrategy } = require('passport-jwt');
const passport = require('passport');
const db = require('../models');
const User = db.User;

let options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET_KEY,
};

require('dotenv').config();

passport.use(new JwStrategy(options))