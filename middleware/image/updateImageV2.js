var requireOption = require('../common').requireOption;

/**
 * Update image
 */
module.exports = objectRepository => {

  return (req, res, next) => {
    let image = res.tpl.images.filter(img => img._id == req.params.imageId);

    if (image.length > 1) {
      return next('ID not unique!');
    } else if (image.length === 0) {
      return next('Image not found!');
    }

    let selectedImage = image[0];

    if (req.body &&
        req.body.serviceProvider &&
        req.body.categoryName &&
        req.body.decision) {

          let catIndex = -1;
          for (let i = 0; i < selectedImage.categories.length; ++i) {
            if (selectedImage.categories[i].name === req.body.serviceProvider) {
              catIndex = i;
            }
          }

          if (catIndex === -1) {
            return next('Image not found!');
          }

          let labIndex = -1;
          for (let i = 0; i < selectedImage.categories[catIndex].categories.length; ++i) {
            if (selectedImage.categories[catIndex].categories[i].name === req.body.categoryName) {
              labIndex = i;
            }
          }

          if (labIndex === -1) {
            return next('Image not found!');
          }

          selectedImage
            .categories[catIndex]
            .categories[labIndex]
            .decision = req.body.decision;

          selectedImage.save((err) => {
            if (err) {
              return next(err);
            }

            res.tpl.response = `${req.params.imageId} updated`;
            return next();
          });

    }
  };

};
