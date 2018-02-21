var requireOption = require('../common').requireOption;

/**
 * Get all images
 */
module.exports = objectRepository => {

  var imageModel = requireOption(objectRepository, 'imageModel');

  return (req, res, next) => {
    console.log('Get images');
    res.tpl.images = [];

    imageModel.find({_user: res.tpl.user_db_id}, (err, results) => {
      if (err) {
        return next(err);
      }

      res.tpl.images = results;
      
      return next();
    });
  };

};
