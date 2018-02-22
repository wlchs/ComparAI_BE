const https = require('https');
const ENVIRONMENTS = require('../../../config/environments');

/**
 * Google cloud service
 */

module.exports = path => new Promise( (resolve, reject) => {
  const body = JSON.stringify({
    "requests":[
      {
        "image":{
          "source":{
            "imageUri": path
          }
        },
        "features":[
          {
            "type":"LABEL_DETECTION",
            "maxResults":3
          }
        ]
      }
    ]
  });

  const options = {
    hostname: 'vision.googleapis.com',
    path: `/v1/images:annotate?key=${ENVIRONMENTS.GOOGLE_API_KEY}`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(body)
    }
  };

  const request = https.request(options, (response) => {
    response.setEncoding('utf8');
    response.on('data', chunk => extractCategories(chunk));
  });

  const extractCategories = body => {
    const parsedBody = JSON.parse(body);
    console.log(body);

    if (parsedBody.responses[0].error) {
      return reject('Network error!');
    }

    const categories = parsedBody.responses[0].labelAnnotations.reduce( (array, label) => {
      array.push(label.description);
      return array;
    },[]);

    return resolve(categories);
  };

  request.on('error', e => {
    console.error(`problem with request: ${e.message}`);
    return reject(e);
  });

  // write data to request body
  request.write(body);
  request.end();
});
