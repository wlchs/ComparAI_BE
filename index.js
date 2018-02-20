var express = require('express');
var app = express();

require('./routes/image')(app);
require('./routes/category')(app);

var server = app.listen(3000, function () {
  console.log("Server listening on port 3000!");
});
