var requireOption = require('../common').requireOption;

/**
 * Get one image
 */
module.exports = objectRepository => {

  var imageModel = requireOption(objectRepository, 'imageModel');

  return (req, res, next) => {
    console.log('Get one image');
    return next();
  };

};