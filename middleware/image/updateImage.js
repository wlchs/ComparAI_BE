var requireOption = require('../common').requireOption;

/**
 * Create or update image
 */
module.exports = objectRepository => {

  let imageModel = requireOption(objectRepository, 'imageModel');

  return (req, res, next) => {
    console.log('Update image', req.body);

    let name = req.body.name;
    let data = req.body.data;

    if (!name || !data) {
      return next('No name or data provided!')
    }

    let image = new imageModel();
    image.name = name;
    image.data = data;
    image._user = res.tpl.user_db_id;

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
