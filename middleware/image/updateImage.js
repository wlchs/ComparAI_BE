const classification = require('./classification');
const Jimp = require("jimp");

var requireOption = require('../common').requireOption;

/**
 * Create or update image
 */
module.exports = objectRepository => {

  let imageModel = requireOption(objectRepository, 'imageModel');

  return (req, res, next) => {
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

    const getThumbnail = buffer => new Promise((resolve, reject) => {
      Jimp.read(buffer)
        .then(buffer => buffer
          .resize(250, Jimp.AUTO, Jimp.RESIZE_BEZIER)
          .getBuffer(Jimp.AUTO, (err, resizedBuffer) => resolve(resizedBuffer)))
        .catch(err => reject(err));
    });

    getThumbnail(image.data)
      .then(thumbnail => {
        image.thumbnail = thumbnail;
        image.save( (err, result) => {
          if (err) {
            return next(err);
          }

          res.tpl.imageBase64 = result.data;

          res.tpl.response = {
            ...res.tpl.response,
            id: result._id
          };

          return next();
        });
      })
      .catch(err => {
        return next(err);
      })
  };

};
