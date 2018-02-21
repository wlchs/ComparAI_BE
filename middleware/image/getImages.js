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

      results.forEach( image => {
        res.tpl.images.push({
          id: image._id,
          name: image.name,
          date: image.date,
          data: image.data,
          cloudPath: image.cloudPath,
          categories: image.categories
        });
      });
      return next();
    });
  };

};
