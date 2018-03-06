const ENVIRONMENTS = require('../../../config/environments');
const Clarifai = require('clarifai');
const clarifai_app = new Clarifai.App({
  apiKey: ENVIRONMENTS.Clarifai_api_key
});

/**
 * Clarifai service
 */

module.exports = (path, imageFile) => new Promise( (resolve, reject) => {
  const encoded = new Buffer(imageFile).toString('base64');

  clarifai_app.models.predict(Clarifai.GENERAL_MODEL, encoded).then(
    function(response) {
      const categories = prepareCategories(response.outputs[0].data.concepts.slice(0, 5));
      resolve(categories);
    },
    function(err) {
      console.log(err);
      resolve([]);
    }
  );

  const prepareCategories = rawList => {
    return rawList.reduce((array, category) => {
      array.push(category.name);
      return array;
    },[]);
  };
});
