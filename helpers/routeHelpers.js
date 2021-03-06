const Joi = require('joi');

module.exports = {
  validateBody: ( schema ) => {
    return ( req, res, next ) => {
      const result = Joi.validate({ email: req.body.email, password: req.body.password }, schema );
      if ( result.error ) {
        return res.status( 400 ).json( result.error );
      }

      if ( !req.value ) { req.value = {}; }
      req.value['body'] = result.value;
      next();
    }
  },
  schemas: {
    authSchema: Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required()
    })
  }
}
