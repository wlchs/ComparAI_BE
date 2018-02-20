let authMW = require('../middleware/generic/auth');
let responseMW = require('../middleware/generic/response');

let getImagesMW = require('../middleware/image/getImages');
let getImageByIdMW = require('../middleware/image/getImageById');
let getImagesByCategoryMW = require('../middleware/image/getImagesByCategory');
let updateImageMW = require('../middleware/image/updateImage');
let deleteImagesMW = require('../middleware/image/deleteMultipleImages');

let imageModel = require('../models/image');
let userModel = require('../models/user');

module.exports = app => {

  let objectRepository = {
    imageModel: imageModel,
    userModel: userModel
  };

  /**
   * Get one image by ID
   */
  app.get('/getImageById/:imageId',
    authMW(objectRepository),
    getImagesMW(objectRepository),
    getImageByIdMW(objectRepository),
    responseMW(objectRepository)
  );

  /**
   * Get all images for a category
   */
  app.get('/getImagesByCategory/:categoryId',
    authMW(objectRepository),
    getImagesMW(objectRepository),
    getImagesByCategoryMW(objectRepository),
    responseMW(objectRepository)
  );

  /**
   * Upload one image
   */
  app.post('/uploadSingle',
    authMW(objectRepository),
    updateImageMW(objectRepository),
    responseMW(objectRepository)
  );

  /**
   * Update one image
   */
  app.put('/updateSingle',
    authMW(objectRepository),
    getImagesMW(objectRepository),
    getImageByIdMW(objectRepository),
    updateImageMW(objectRepository),
    responseMW(objectRepository)
  );

  /**
   * Delete images specified by ID
   */
  app.delete('/deleteMultipleImages',
    authMW(objectRepository),
    getImagesMW(objectRepository),
    deleteImagesMW(objectRepository),
    responseMW(objectRepository)
  );
};
