var requireOption = require('../common').requireOption;

/**
 * Get one image
 */
module.exports = objectRepository => {

  var imageModel = requireOption(objectRepository, 'imageModel');

  return (req, res, next) => {
    console.log('Get one image');

    imageModel.findOne({_user: res.tpl.user_db_id, _id: req.params.imageId}, (err, result) => {
      if (err) {
        return next(err);
      }

      res.tpl.response = {image: result};

      return next();
    });
  };

};
