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
    let password_hash = req.body.password_hash;
    let code = req.body.code;

    if (!userId || ! password_hash) {
      res.status(400);
      return res.send('No userId or password!');
    }

    if (code !== 'Szakdolgozat2018') {
      res.status(400);
      return res.send('Invalid code!');
    }

    userModel.findOne({name: userId}, (err, result) => {
      if (err) {
        return next(err);
      }

      if (result) {
        res.status(400);
        return res.send('Username taken!');
      }

      let user = new userModel();
      user.name = userId;
      user.password_hash = bcrypt.hashSync(password_hash, 10);

      user.save((err, result) => {
        if (err) {
          return next(err);
        }

        res.tpl.response = {
          message: "User succesfully created!",
          name: result.name
        }

        return next();
      });
    });
  };

};
