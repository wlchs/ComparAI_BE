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
      image.categories.forEach(classificationService => {
        if (!req.params.categoryName || classificationService.categories.includes(req.params.categoryName)) {
          if (!ids.includes(image._id)) {
            ids.push(image._id);
            images.push({
              id: image._id,
              name: image.name,
              date: image.date,
              categories: image.categories
            });
          }
        }
      })
    });

    res.tpl.response = {
      ...res.tpl.response,
      images
    };

    return next();
  };

};
