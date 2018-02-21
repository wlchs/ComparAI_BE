let getTokenMW = require('../middleware/user/getToken');
let responseMW = require('../middleware/generic/response');

let userModel = require('../models/user');

module.exports = app => {

  let objectRepository = {
    userModel: userModel
  };

  /**
   * Issue token
   */
  app.post('/auth',
    getTokenMW(objectRepository),
    responseMW(objectRepository)
  );
};
