var requireOption = require('../common').requireOption;

/**
 * Get one image
 */
module.exports = objectRepository => {

  return (req, res, next) => {
    const resultSet = res.tpl.images.filter(image => image._id == req.params.imageId);

    if (resultSet.length !== 1) {
      return next('Image not found!')
    }

    const result = resultSet[0];

    res.tpl.response = {
      data: result.data,
      contentType: result.contentType
    };

    return next();
  };

};
