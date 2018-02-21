var requireOption = require('../common').requireOption;

/**
 * Get categories
 */
module.exports = objectRepository => {

  var imageModel = requireOption(objectRepository, 'imageModel');

  return (req, res, next) => {
    console.log('Get categories');

    let categories = new Set();

    res.tpl.images.forEach( image => image.categories.forEach(category => {
      categories.add(category);
    }));

    let categoryArray = [...categories];

    res.tpl.response = {
      ...res.tpl.response,
      categories: categoryArray
    };

    return next();
  };

};
