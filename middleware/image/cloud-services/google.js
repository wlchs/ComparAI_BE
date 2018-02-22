const ENVIRONMENTS = require('../../../config/environments');
const vision = require('@google-cloud/vision');
const client = new vision.v1.ImageAnnotatorClient({
  keyFilename: './config/ComparAI-d94f014e8600.json'
});

/**
 * Google cloud service
 */

module.exports = (path, imageFile) => new Promise( (resolve, reject) => {
  const encoded = new Buffer(imageFile).toString('base64');

  const request = {
    image: {content: encoded},
    features: [
      {
        type: "LABEL_DETECTION",
        maxResults: 3
      }
    ],
  };

  client.annotateImage(request)
    .then(response => {
      const categories = prepareCategories(response[0].labelAnnotations);
      return resolve(categories);
    })
    .catch(err => {
      console.log(err);
      resolve([]);
    }
  );

  const prepareCategories = rawList => {
    return rawList.reduce((array, category) => {
      array.push(category.description);
      return array;
    },[]);
  };
});
