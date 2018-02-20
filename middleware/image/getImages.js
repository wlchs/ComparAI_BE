var requireOption = require('../common').requireOption;

/**
 * Get all images
 */
module.exports = objectRepository => {

  var imageModel = requireOption(objectRepository, 'imageModel');

  return (req, res, next) => {
    console.log('Get images');
    return next();
  };

};
