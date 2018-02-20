var requireOption = require('../common').requireOption;

/**
 * Create or update image
 */
module.exports = objectRepository => {

  var imageModel = requireOption(objectRepository, 'imageModel');

  return (req, res, next) => {
    console.log('Update image');
    return next();
  };

};
