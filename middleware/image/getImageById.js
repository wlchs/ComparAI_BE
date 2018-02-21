var requireOption = require('../common').requireOption;

/**
 * Get one image
 */
module.exports = objectRepository => {

  var imageModel = requireOption(objectRepository, 'imageModel');

  return (req, res, next) => {
    console.log('Get one image');

    let image = res.tpl.images.filter( image => {
      return image.id == req.params.imageId;
    });

    if(image.length > 0) {
      res.tpl.response = {
        ...res.tpl.response,
        image: image
      };
    }

    return next();
  };

};
