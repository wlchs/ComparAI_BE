var requireOption = require('../common').requireOption;

/**
 * Create or update image
 */
module.exports = objectRepository => {

  var imageModel = requireOption(objectRepository, 'imageModel');

  return (req, res, next) => {
    console.log('Update image', req.body);

    let image = new imageModel();
    image.name = 'Lorem ipsum';
    image.save( (err, result) => {
      if (err) {
        return next(err);
      }

      res.tpl.response = {
        ...res.tpl.response,
        id: result._id
      };

      return next();
    });
  };

};
