var requireOption = require('../common').requireOption;

/**
 * Get categories
 */
module.exports = objectRepository => {

  var imageModel = requireOption(objectRepository, 'imageModel');

  return (req, res, next) => {
    console.log('Get categories');

    let categories = {};

    res.tpl.images.forEach( image => image.categories.forEach(category => {
      categories[category] = categories[category] + 1 || 1;
    }));

    res.tpl.response = {
      ...res.tpl.response,
      categories: categories
    };

    return next();
  };

};
