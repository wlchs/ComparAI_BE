var requireOption = require('../common').requireOption;

/**
 * Get all images for a category
 */
module.exports = objectRepository => {

  var imageModel = requireOption(objectRepository, 'imageModel');

  return (req, res, next) => {
    let ids = [];

    res.tpl.images.forEach(image => {
      image.categories.forEach(classificationService => {
        if (!req.params.categoryName || classificationService.categories.includes(req.params.categoryName)) {
          ids.push(image._id);
        }
      })
    });

    res.tpl.response = {
      ...res.tpl.response,
      images: ids
    };

    return next();
  };

};
