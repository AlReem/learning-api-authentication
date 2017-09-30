const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local').Strategy;
const User = require('./models/user');

const { JWT_SECRET } = require('./configuration');

var opts = {}
opts.jwtFromRequest = ExtractJwt.fromHeader('authorization');
opts.secretOrKey = JWT_SECRET;
// opts.issuer = 'accounts.examplesoft.com';
// opts.audience = 'yoursite.net';

// jwt strategy
passport.use(new JwtStrategy(opts,  async (jwt_payload, done) => {
  try {
    // Find the user specified in the token
    const user = await User.findById( jwt_payload.sub );

    // If user doesn't exist, handle it
    if (!user) {
      return done( null, false );
    }

    // Otherwise, return the user
    done( null, user );

  } catch (e) {
    done( e, false );
  } finally {

  }
}));


// Local Strategy
passport.use(new LocalStrategy({
  usernameField: 'email',  // This is in passportjs documentation
  passwordField: 'password'
}, async ( email, password, done ) => {
  try {
    // find the user using the email
    const user = await User.findOne( { email: email } );

    // If not exist, handle it
    if (!user) {
      return done( null, false );
    }

    // If exists, check if password is correct
    const isMatch = await user.isValidPassword( password );

    // If password incorrect, handle it
    if (!isMatch) {
      return done( null, false );
    }

    // If all ok, return user
    done( null, user );

  } catch (e) {
    done(e, false)
  } finally {

  }
}));
