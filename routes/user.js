let registerMW = require('../middleware/user/register');
let getTokenMW = require('../middleware/user/getToken');
let responseMW = require('../middleware/generic/response');

let userModel = require('../models/user');

module.exports = app => {

  let objectRepository = {
    userModel: userModel
  };

  /**
   * Register new user
   */
  app.post('/register',
    registerMW(objectRepository),
    responseMW(objectRepository)
  );

  /**
   * Issue token
   */
  app.post('/auth',
    getTokenMW(objectRepository),
    responseMW(objectRepository)
  );
};
