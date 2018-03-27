const ENVIRONMENTS = require('../../config/environments');

var requireOption = require('../common').requireOption;

/**
 * Get metadata
 */
module.exports = objectRepository => {

  var imageModel = requireOption(objectRepository, 'imageModel');

  return (req, res, next) => {
    res.tpl = {...res.tpl};

    const response = res.tpl.images.filter(image => {
      return image._id == req.params.imageId;
    })[0];

    if (!response) {
      return next('Image not found!')
    }

    res.tpl.response = {
      id: response._id,
      name: response.name,
      date: response.date,
      url: `/getImageById/${response._id}`,
      categories: response.categories
    }

    return next();
  };

};
