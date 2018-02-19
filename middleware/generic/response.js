/**
 * Response middleware
 */
module.exports = objectRepository => {

  return (req, res) => {
    console.log('Response');

    res.setHeader('Content-Type', 'application/json');

    if (res.tpl) {
      res.send(JSON.stringify(res.tpl.response || {}));
    } else {
      res.send(JSON.stringify({}));  
    }
  };

};
