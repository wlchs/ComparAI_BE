var requireOption = require('../common').requireOption;

/**
 * Delete images
 */
module.exports = objectRepository => {

  var imageModel = requireOption(objectRepository, 'imageModel');

  return (req, res, next) => {
    console.log('Delete images');

    imageModel.deleteMany({_user: res.tpl.user_db_id, _id: {$in: req.body.id}},
      err => {
        if (err) {
          return next("Something went wrong!");
        }

        return next();
      });
  };

};
