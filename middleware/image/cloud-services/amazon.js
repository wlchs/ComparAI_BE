const ENVIRONMENTS = require('../../../config/environments');
const AWS = require('aws-sdk');
AWS.config.loadFromPath('./config/awsconfig.json');

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
  var rekognition = new AWS.Rekognition();

  rekognition.detectLabels(params, (err, data) => {
    if (err) {
      reject(err); // an error occurred
    }
    else {
      const categories = data.Labels.reduce((array, label) => {
        array.push(label.Name.toLowerCase());
        return array;
      },[]);

      resolve(categories);
    }
  });
});
