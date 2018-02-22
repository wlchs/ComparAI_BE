var requireOption = require('../common').requireOption;

/**
 * Delete images
 */
module.exports = objectRepository => {

  var imageModel = requireOption(objectRepository, 'imageModel');

  return (req, res, next) => {
    imageModel.deleteMany({_user: res.tpl.user_db_id, _id: {$in: req.body.id}},
      (err, result) => {
        if (err) {
          return next("Something went wrong!");
        }

        res.tpl.response = {
          message: `${result.n} image(s) deleted!`
        }

        return next();
      });
  };

};
