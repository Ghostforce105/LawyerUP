const express = require('express');
const session = require('express-session');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const app = express();

const GOOGLE_CLIENT_ID = 'Y752554633701-c7ds3748ddaigvs0me4faar6v94ji5kn.apps.googleusercontent.com';
const GOOGLE_CLIENT_SECRET = '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';

passport.use(new GoogleStrategy({
  clientID: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
  callbackURL: "/auth/google/callback"
}, (accessToken, refreshToken, profile, done) => {
  console.log("Google profile:", profile);
  return done(null, profile);
}));

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((obj, done) => done(null, obj));

app.use(session({ secret: 'secretkey', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

// Start Google OAuth
app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

// Callback from Google
app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    res.send(`Hello ${req.user.displayName}! <a href="/logout">Logout</a>`);
  }
);

app.get('/logout', (req, res) => {
  req.logout(() => {
    res.redirect('/');
  });
});

app.get('/', (req, res) => {
  res.send('<h1>Welcome</h1><a href="/auth/google">Login with Google</a>');
});

app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});
