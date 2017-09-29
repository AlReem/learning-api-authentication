module.exports = {

  signUp: async (req, res, next) => {
    // Already validated Email & Password
    // req.value.body will have the all the data
    console.log( 'req.value.body is set as follows... ', req.value.body );
    console.log( 'req.body is set as follows... ', req.body );
    console.log('UsersController.signUp() called!!!');
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
