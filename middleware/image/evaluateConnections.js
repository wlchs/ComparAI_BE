var requireOption = require('../common').requireOption;

/**
 * Evaluate connections
 */
module.exports = objectRepository => {

  var imageModel = requireOption(objectRepository, 'imageModel');

  return (req, res, next) => {
    res.tpl.response = [];

    res.tpl.images.forEach(image => {
      image.categories.forEach(serviceProvider => {
        serviceProvider.categories.forEach(category => {
          res.tpl.response.push({
            serviceProvider: serviceProvider.name,
            image: image._id,
            label: category.name.toUpperCase()
          });
          //console.log(`${serviceProvider.name},${image._id},${category.name.toUpperCase()}`);
        })
      })
    });

    return next();
  };

};
