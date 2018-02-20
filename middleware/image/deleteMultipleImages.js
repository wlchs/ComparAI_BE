var requireOption = require('../common').requireOption;

/**
 * Delete images
 */
module.exports = objectRepository => {

  var imageModel = requireOption(objectRepository, 'imageModel');

  return (req, res, next) => {
    console.log('Delete images');
    return next();
  };

};
