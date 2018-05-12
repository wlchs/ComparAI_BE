const classification = require('./classification');
const Jimp = require("jimp");

var requireOption = require('../common').requireOption;

/**
 * Create or update image
 */
module.exports = objectRepository => {

  let imageModel = requireOption(objectRepository, 'imageModel');

  const getThumbnail = buffer => new Promise((resolve, reject) => {
    Jimp.read(buffer)
      .then(buffer => buffer
        .resize(250, Jimp.AUTO, Jimp.RESIZE_BEZIER)
        .getBuffer(Jimp.AUTO, (err, resizedBuffer) => resolve(resizedBuffer)))
      .catch(err => reject(err));
  });

  return (req, res, next) => {
    const processImage = file => new Promise((resolve, reject) => {
      const name = file.originalname;
      const data = file.buffer;
      const contentType = file.mimetype;

      if (!name || !data || !contentType) {
        return reject('Malformed data!');
      }

      let image = new imageModel();
      image._user = res.tpl.user_db_id;
      image.name = name;
      image.data = data;
      image.contentType = contentType;

      getThumbnail(data)
        .then(thumbnail => {
          image.thumbnail = thumbnail;
          image.save( (err, result) => {
            if (err) {
              return reject(err);
            }

            return resolve({id: result._id, data: result.data});
          });
        })
        .catch(err => {
          return reject(err);
        })
      });
    let promises = [];

    req.files.forEach(file => {
      promises.push(processImage(file));
    });

    Promise.all(promises).then(results => {
      res.tpl.imageBase64 = results;
      return next();
    })
    .catch(err => {
      return next(err);
    });
  };

};
