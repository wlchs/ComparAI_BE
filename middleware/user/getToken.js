let jwt = require('jsonwebtoken');
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
    let password_hash = req.body.password_hash;

    if (!userId || ! password_hash) {
      return next("No userId or password!");
    }

    userModel.findOne({name: userId}, function (err, result) {
      if (err) {
        return next(err);
      }

      if (result.password_hash === password_hash) {
        var token = jwt.sign(
          {
            userId: userId,
            _id: result._id
          }, ENVIRONMENTS.auth_secret);

        res.tpl.response = {
          ...res.tpl.response,
          token: token
        };

        return next();
      }

      return next("Wrong userId or password!");
    });
  };

};
