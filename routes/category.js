let authMW = require('../middleware/generic/auth');
let responseMW = require('../middleware/generic/response');

let getImagesMW = require('../middleware/image/getImages');
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
    getImagesMW(objectRepository),
    getCategoriesMW(objectRepository),
    responseMW(objectRepository)
  );
};
