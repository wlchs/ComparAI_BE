var requireOption = require('../common').requireOption;

/**
 * Get all images for a category
 */
module.exports = objectRepository => {

  var imageModel = requireOption(objectRepository, 'imageModel');

  return (req, res, next) => {
    console.log('Get images for a category');
    return next();
  };

};
