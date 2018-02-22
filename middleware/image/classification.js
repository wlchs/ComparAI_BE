const https = require('https');
let ENVIRONMENTS = require('../../config/environments');

var requireOption = require('../common').requireOption;

/**
 * Image classification
 */
module.exports = objectRepository => {

  var imageModel = requireOption(objectRepository, 'imageModel');

  return (req, res, next) => {
    const path = `${ENVIRONMENTS.current_env}/getImageById/${res.tpl.response.id}`;


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
      response.on('data', chunk => updateCategories(chunk));
    });

    request.on('error', e => {
      console.error(`problem with request: ${e.message}`);
      return next(e);
    });

    // write data to request body
    request.write(body);
    request.end();

    const updateCategories = body => {
      const parsedBody = JSON.parse(body);
      const categories = parsedBody.responses[0].labelAnnotations.reduce( (array, label) => {
        array.push(label.description);
        return array;
      },[]);

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
          }

          return next();
        });
      });
    };
  };

};
