var requireOption = require('../common').requireOption;

/**
 * Get categories
 */
module.exports = objectRepository => {

  var imageModel = requireOption(objectRepository, 'imageModel');

  return (req, res, next) => {
    console.log('Get categories');
    return next();
  };

};
