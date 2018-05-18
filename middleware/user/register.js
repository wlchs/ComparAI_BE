let bcrypt = require('bcrypt');

let requireOption = require('../common').requireOption;
let ENVIRONMENTS = require('../../config/environments');

/**
 * User registration middleware
 */
module.exports = objectRepository => {

  let userModel = requireOption(objectRepository, 'userModel');

  return (req, res, next) => {
    res.tpl = {};
    console.log('Register');
    let userId = req.body.userId;
    let password_hash = req.body.password;
    let code = req.body.code;

    if (!userId || ! password_hash) {
      return next('No userId or password!');
    }

    if (code !== ENVIRONMENTS.REGISTRATION_CODE) {
      return next('Invalid code!');
    }

    userModel.findOne({name: userId}, (err, result) => {
      if (err) {
        return next(err);
      }

      if (result) {
        return next('Username taken!');
      }

      let user = new userModel();
      user.name = userId;
      user.password_hash = bcrypt.hashSync(password_hash, 10);

      user.save((err, result) => {
        if (err) {
          return next(err);
        }

        res.tpl.response = {
          message: "User successfully created!",
          name: result.name
        }

        return next();
      });
    });
  };

};
