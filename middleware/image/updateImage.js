const classification = require('./classification');

var requireOption = require('../common').requireOption;

/**
 * Create or update image
 */
module.exports = objectRepository => {

  let imageModel = requireOption(objectRepository, 'imageModel');

  return (req, res, next) => {
    console.log('Update image', req.body, req.file);

    const name = req.body.name;
    const data = req.file.buffer;
    const contentType = req.file.mimetype;

    let image = undefined;
    if (res.tpl.response && res.tpl.response.image) {
      image = res.tpl.response.image;
      res.tpl.response = {
        ...res.tpl.response,
        image: undefined
      };
    }
    else {
      if (!name || !data) {
        return next('No name or data provided!')
      }

      image = new imageModel();
      image._user = res.tpl.user_db_id;
    }

    image.name = name || image.name;
    image.data = data || image.data;
    image.contentType = contentType || image.contentType;

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
