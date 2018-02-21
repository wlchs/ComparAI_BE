var requireOption = require('../common').requireOption;

/**
 * Get one image
 */
module.exports = objectRepository => {

  var imageModel = requireOption(objectRepository, 'imageModel');

  return (req, res, next) => {
    console.log('Get one image');
    res.tpl = {...res.tpl};

    imageModel.findOne({_id: req.params.imageId}, (err, result) => {
      if (err) {
        return next(err);
      }

      res.tpl.response = {image: result};

      return next();
    });
  };

};
