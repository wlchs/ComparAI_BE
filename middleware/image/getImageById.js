var requireOption = require('../common').requireOption;

/**
 * Get one image
 */
module.exports = objectRepository => {

  var imageModel = requireOption(objectRepository, 'imageModel');

  return (req, res, next) => {
    res.tpl = {...res.tpl};

    imageModel.findOne({_id: req.params.imageId, _user: res.tpl.user_db_id}, (err, result) => {
      if (err) {
        return next(err);
      }

      if (!result) {
        return next('Image not found!')
      }

      res.tpl.response = {
        data: result.data,
        contentType: result.contentType
      };
      return next();
    });
  };

};
