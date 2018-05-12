const googleService = require('./cloud-services/google');
const aws = require('./cloud-services/amazon');
const clarifai_service = require('./cloud-services/clarifai');
let ENVIRONMENTS = require('../../config/environments');

var requireOption = require('../common').requireOption;

/**
 * Image classification
 */
module.exports = objectRepository => {

  var imageModel = requireOption(objectRepository, 'imageModel');

  return (req, res, next) => {
    res.tpl.response = {
      images: []
    }

    const updateCategories = classifiedImage => new Promise((resolve, reject) => {
      imageModel.findOne({_id: classifiedImage.id}, (err, image) => {
        if (err) {
          return reject(err);
        }

        if (!image) {
          return resolve();
        }

        image.categories = classifiedImage.categories;
        image.save( (err, result) => {
          if (err) {
            return reject(err);
          };

          res.tpl.response.images.push({
            id: image._id,
            name: image.name,
            date: image.date,
            thumbnail: image.thumbnail,
            contentType: image.contentType,
            categories: image.categories
          });

          return resolve();
        });
      });
    });

    const classify = image => new Promise((resolve, reject) => {
      let categories = [];
      Promise.all([
        googleService(image.data),
        aws(image.data),
        clarifai_service(image.data)
      ])
        .then(response => {
          categories.push({name: 'google', categories: response[0]});
          categories.push({name: 'aws', categories: response[1]});
          categories.push({name: 'clarifai', categories: response[2]})
        })
        .then(() => {
          return resolve({id: image.id, categories});
        })
        .catch(e => {
          return reject(e);
        });
    });

    let classificationPromises = [];
    res.tpl.imageBase64.forEach(imageBase64 => {
      classificationPromises.push(classify(imageBase64));
    });

    Promise.all(classificationPromises).then(result => {
      let updatePromises = [];
      result.forEach(categories => {
        updatePromises.push(updateCategories(categories));
      });

      Promise.all(updatePromises)
        .then(() => {
          return next();
        })
        .catch(err => {
          return next(err);
        });
    });
  };

};
