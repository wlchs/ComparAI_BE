/**
 * Response middleware
 */
module.exports = objectRepository => {

  return (req, res) => {
    if (res.tpl && res.tpl.response && res.tpl.response.image) {
      res.contentType(res.tpl.response.image.contentType);
      return res.end(res.tpl.response.image.data);
    }

    res.setHeader('Content-Type', 'application/json');

    if (res.tpl) {
      res.send(JSON.stringify(res.tpl.response || {}));
    } else {
      res.send(JSON.stringify({}));
    }
  };

};
