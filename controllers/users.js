const JWT = require('jsonwebtoken');
const User = require('../models/user');
const { JWT_SECRET } = require('../configuration');


signToken = user => {
  // Respond with token
  return JWT.sign({
    iss: 'Abuzayd',
    sub: user.id,
    iat: new Date().getTime(),
    exp: new Date().setDate( new Date().getDate() + 1 )
  }, JWT_SECRET );
}


module.exports = {

  signUp: async (req, res, next) => {
    // Already validated Email & Password
    // req.value.body will have the all the data
    // console.log( 'req.value.body is set as follows... ', req.value.body );
    // console.log( 'req.body is set as follows... ', req.body );
    console.log('UsersController.signUp() called!!!');

    const { email, password } = req.value.body;

    // Check if there is a user with the same email
    const foundUser = await User.findOne({ email: email });
    if ( foundUser ) {
      return res.status(409).json({ error: 'Email is already in use' });
    }

    // Create a new user
    const newUser = new User({
      email: email,
      password: password
    });
    await newUser.save();

    // Generate token
    const token = signToken( newUser );

    res.status(200).json({ token });
  },

  signIn: async (req, res, next) => {
    // Generate token
    const token = signToken( req.user );
    res.status(200).json({ token });
  },

  secret: async (req, res, next) => {
    // Send what was requested
    console.log('I managed to get here');
    res.status(200).json({ secret: "resource" });
  }

}
