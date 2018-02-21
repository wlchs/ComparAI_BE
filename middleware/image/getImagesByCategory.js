var requireOption = require('../common').requireOption;

/**
 * Get all images for a category
 */
module.exports = objectRepository => {

  var imageModel = requireOption(objectRepository, 'imageModel');

  return (req, res, next) => {
    console.log('Get images for a category');

    let image = res.tpl.images.filter( image => {
      return image.categories.includes(req.params.categoryName);
    });

    if(image.length > 0) {
      res.tpl.response = {
        ...res.tpl.response,
        images: image
      };
    }

    return next();
  };

};
