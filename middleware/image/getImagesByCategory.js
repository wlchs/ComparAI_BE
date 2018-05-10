var requireOption = require('../common').requireOption;

/**
 * Get all images for a category
 */
module.exports = objectRepository => {

  var imageModel = requireOption(objectRepository, 'imageModel');

  return (req, res, next) => {
    let ids = [];
    let images = [];

    res.tpl.images.forEach(image => {
      images.push({
        id: image._id,
        name: image.name,
        date: image.date,
        thumbnail: image.thumbnail,
        contentType: image.contentType,
        categories: image.categories
      });
    });

    res.tpl.response = {
      ...res.tpl.response,
      images
    };

    return next();
  };

};
