const User = require('../models/user');

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

    // Respond with token
    res.json({ user: 'created' });
  },

  signIn: async (req, res, next) => {
    // Generate token
    console.log('UsersController.signIn() called!!!');
  },

  secret: async (req, res, next) => {
    // Send what was requested
    console.log('UsersController.secret() called!!!');
  }

}
