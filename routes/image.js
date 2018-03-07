var multer  = require('multer');
var storage = multer.memoryStorage()
var upload = multer({ storage: storage })

let authMW = require('../middleware/generic/auth');
let responseMW = require('../middleware/generic/response');

let getImagesMW = require('../middleware/image/getImages');
let getMetadataByIdMW = require('../middleware/image/getMetadataById');
let getImageByIdMW = require('../middleware/image/getImageById');
let getImagesByCategoryMW = require('../middleware/image/getImagesByCategory');
let updateImageMW = require('../middleware/image/updateImage');
let imageClassificationMW = require('../middleware/image/classification');
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
    getImageByIdMW(objectRepository),
    responseMW(objectRepository)
  );

  /**
   * Get metadata by ID
   */
  app.get('/getMetadataById/:imageId',
    authMW(objectRepository),
    getImagesMW(objectRepository),
    getMetadataByIdMW(objectRepository),
    responseMW(objectRepository)
  );

  /**
   * Get all images for a category
   */
  app.get('/getImagesByCategory/:categoryName',
    authMW(objectRepository),
    getImagesMW(objectRepository),
    getImagesByCategoryMW(objectRepository),
    responseMW(objectRepository)
  );

  /**
   * Get all images
   */
  app.get('/getImagesByCategory',
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
    upload.array('image'),
    updateImageMW(objectRepository),
    imageClassificationMW(objectRepository),
    responseMW(objectRepository)
  );

  /**
   * Delete images specified by ID
   */
  app.delete('/deleteMultipleImages',
    authMW(objectRepository),
    deleteImagesMW(objectRepository),
    responseMW(objectRepository)
  );
};
