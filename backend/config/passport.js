const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const db = require('../models/db');

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: 'https://localhost:3001/auth/google/callback'
}, (accessToken, refreshToken, profile, done) => {
  const email = profile.emails[0].value;
  db.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
    if (results.length > 0) {
      return done(null, results[0]);
    } else {
      // insert user if not found
      db.query('INSERT INTO users (name, email) VALUES (?, ?)', [profile.displayName, email], (err, result) => {
        db.query('SELECT * FROM users WHERE id = ?', [result.insertId], (err, user) => {
          done(null, user[0]);
        });
      });
    }
  });
}));
