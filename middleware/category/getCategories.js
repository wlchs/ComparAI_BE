var requireOption = require('../common').requireOption;

/**
 * Get categories
 */
module.exports = objectRepository => {

  return (req, res, next) => {
    let categories = {};

    res.tpl.images.forEach(
      image => {
        let categorySet = new Set();

        image.categories.forEach(
          imageService => imageService.categories.forEach(
            label => {
              categorySet.add(label);
            }
          )
        );

        categorySet.forEach(
          label => categories[label] = categories[label] + 1 || 1
        );
      }
    );

    res.tpl.response = {
      ...res.tpl.response,
      categories: categories
    };

    return next();
  };

};
