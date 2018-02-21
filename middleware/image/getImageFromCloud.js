var requireOption = require('../common').requireOption;

/**
 * Get one image from cloud
 */
module.exports = objectRepository => {

  var imageModel = requireOption(objectRepository, 'imageModel');

  return (req, res, next) => {
    console.log('Get one image from cloud');

    return next();
  };

};
