var requireOption = require('../common').requireOption;

/**
 * Update image
 */
module.exports = objectRepository => {

  let imageModel = requireOption(objectRepository, 'imageModel');

  return (req, res, next) => {
    imageModel.findOne({_user: res.tpl.user_db_id, _id: req.params.imageId}, (err, selectedImage) => {
      if (err) {
        return next(err);
      }

      if (!selectedImage) {
        return next('Image not found');
      }

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

            selectedImage.categories.set(catIndex,
              selectedImage.categories[catIndex]);

            selectedImage.save((err, result) => {
              if (err) {
                return next(err);
              }

              res.tpl.response = `${req.params.imageId} updated`;
              return next();
            });

      }
    });
  };

};
