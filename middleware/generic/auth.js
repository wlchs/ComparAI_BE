/**
 * Authentication middleware
 */
module.exports = objectRepository => {

  return (req, res, next) => {
    console.log('Authentication');
    
    return next();
  };

};
