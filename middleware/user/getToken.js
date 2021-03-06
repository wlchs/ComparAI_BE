let jwt = require('jsonwebtoken');
let bcrypt = require('bcrypt');

let requireOption = require('../common').requireOption;
let ENVIRONMENTS = require('../../config/environments');

/**
 * Token middleware
 */
module.exports = objectRepository => {

  let userModel = requireOption(objectRepository, 'userModel');

  return (req, res, next) => {
    res.tpl = {};
    console.log('Token');
    let userId = req.body.userId;
    let password_hash = req.body.password;

    if (!userId || ! password_hash) {
      return next('No userId or password!');
    }

    userModel.findOne({name: userId}, (err, result) => {
      if (err) {
        return next(err);
      }

      if (!result) {
        return next('Bad username or password!');
      }

      bcrypt.compare(password_hash, result.password_hash).then(valid => {
        if (valid) {
          var token = jwt.sign(
            {
              userId: userId,
              _id: result._id
            },
            ENVIRONMENTS.auth_secret,
            {expiresIn: '6h'}
          );

          res.tpl.response = {
            ...res.tpl.response,
            token
          };

          return next();
        }

        return next('Bad username or password!');
      });
    });
  };

};
