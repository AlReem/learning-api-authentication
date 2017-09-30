const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;

// Create a schema
const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercast: true
  },
  password: {
    type: String,
    required: true
  }
});

userSchema.pre( 'save', async function ( next ) {
  try {
    // Generate a salt
    const salt = await bcrypt.genSalt(10);
    // Generate password Hash
    const passwordHash = await bcrypt.hash( this.password , salt );
    // return password
    this.password = passwordHash;
    next();
    // console.log( 'salt', salt );
    // console.log( 'Original Password', this.password );
    // console.log( 'Hashed Password', passwordHash );
  } catch (e) {
    next( e )
  } finally {

  }
  next();
});

userSchema.methods.isValidPassword = async function ( newPassword ) {
  try {
    return await bcrypt.compare( newPassword, this.password )
  } catch (e) {
    throw new Error(e)
  } finally {

  }
}


// Create a model
const User = mongoose.model( 'user', userSchema );

// Export the model
module.exports = User;
