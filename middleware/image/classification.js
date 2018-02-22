const googleService = require('./cloud-services/google');
let ENVIRONMENTS = require('../../config/environments');

var requireOption = require('../common').requireOption;

/**
 * Image classification
 */
module.exports = objectRepository => {

  var imageModel = requireOption(objectRepository, 'imageModel');

  return (req, res, next) => {
    console.log('Classify image');
    const path = `${ENVIRONMENTS.current_env}/getImageById/${res.tpl.response.id}`;

    let cat = [];

    googleService(path)
      .then(res => cat.push({name: 'google', categories: res}))
      .then(() => updateCategories(cat))
      .catch(e => {
        return next(e);
      });

    const updateCategories = categories => {

      imageModel.findOne({_id: res.tpl.response.id}, (err, image) => {
        if (err) {
          return next(err);
        }

        if (!image) {
          return next();
        }

        image.categories = categories;
        image.save( (err, result) => {
          if (err) {
            return next(err);
          };

          return next();
        });
      });
    };
  };

};
