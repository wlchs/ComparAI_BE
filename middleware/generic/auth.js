/**
 * Authentication middleware
 */
module.exports = objectRepository => {

  return (req, res, next) => {
    console.log('Authentication');
    res.tpl = {};
    return next();
  };

};
