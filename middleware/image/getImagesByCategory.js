var requireOption = require('../common').requireOption;

/**
 * Get all images for a category
 */
module.exports = objectRepository => {

  var imageModel = requireOption(objectRepository, 'imageModel');

  return (req, res, next) => {
    console.log('Get images for a category');

    let images = res.tpl.images.filter( image => {
      return !req.params.categoryName || image.categories.includes(req.params.categoryName);
    }).reduce( (acc, img) => {
      acc.push(img._id);
      return acc;
    }, []);

    res.tpl.response = {
      ...res.tpl.response,
      images: images
    };

    return next();
  };

};
