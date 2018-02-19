let authMW = require('../middleware/generic/auth');
let responseMW = require('../middleware/generic/response');

module.exports = app => {

  let objectRepository = {
  };

  /**
   * Get one image by ID
   */
  app.get('/getImageById/:imageId',
    authMW(objectRepository),
    responseMW(objectRepository)
  );
};
