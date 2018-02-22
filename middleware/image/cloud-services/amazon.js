const ENVIRONMENTS = require('../../../config/environments');
const AWS = require('aws-sdk');
AWS.config.loadFromPath('./config/awsconfig.json');
const rekognition = new AWS.Rekognition();

/**
 * AWS
 */

module.exports = (path, imageBase64) => new Promise( (resolve, reject) => {
  var params = {
    Image: { /* required */
      Bytes: new Buffer(imageBase64),
    },
    MaxLabels: 3,
  };

  rekognition.detectLabels(params, (err, data) => {
    if (err) {
      console.log(err);
      resolve([]); // an error occurred
    }
    else {
      const categories = prepareCategories(data.Labels);
      resolve(categories);
    }
  });

  const prepareCategories = rawList => {
    return rawList.reduce((array, label) => {
      array.push(label.Name.toLowerCase());
      return array;
    },[]);
  };
});
