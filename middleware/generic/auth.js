let jwt = require('jsonwebtoken');
let ENVIRONMENTS = require('../../config/environments');

/**
 * Authentication middleware
 */
module.exports = objectRepository => {

  return (req, res, next) => {
    console.log('Authorization');
    res.tpl = {};

    let authHeader = req.get('Authorization');
    if (authHeader && authHeader.split(' ')[0] == 'Bearer:') {
      let token = authHeader.split(' ')[1];
      var decoded = jwt.verify(token, ENVIRONMENTS.auth_secret);
      console.log(JSON.stringify(decoded)); // bar
    }

    return next();
  };

};
