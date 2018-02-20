let authMW = require('../middleware/generic/auth');
let responseMW = require('../middleware/generic/response');

let getCategoriesMW = require('../middleware/category/getCategories');

let imageModel = require('../models/image');
let userModel = require('../models/user');

module.exports = app => {

  let objectRepository = {
    imageModel: imageModel,
    userModel: userModel
  };

  /**
   * Get all categories
   */
  app.get('/getCategories',
    authMW(objectRepository),
    getCategoriesMW(objectRepository),
    responseMW(objectRepository)
  );
};
