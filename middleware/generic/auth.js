let jwt = require('jsonwebtoken');
let ENVIRONMENTS = require('../../config/environments');

/**
 * Authentication middleware
 */
module.exports = objectRepository => {

  return (req, res, next) => {
    res.tpl = {};

    let authHeader = req.get('Authorization');
    if (authHeader && authHeader.split(' ')[0] == 'Bearer') {
      let token = authHeader.split(' ')[1];

      try {
        var decoded = jwt.verify(
          token,
          ENVIRONMENTS.auth_secret,
          {maxAge: '6h'}
        );

        res.tpl.user_db_id = decoded._id;
        return next();
      }
      catch(ignore) {}
    }

    res.status(401);
    return res.send('Failed to authenticate user!');
  };

};
