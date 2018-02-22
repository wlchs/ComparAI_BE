var express = require('express');
var app = express();
var bodyParser = require('body-parser');

/**
 * Parse parameters in POST
 */
// for parsing application/json
app.use(bodyParser.json());
// for parsing application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
  extended: true
}));

require('./routes/user')(app);
require('./routes/image')(app);
require('./routes/category')(app);

var server = app.listen(3300, function () {
  console.log("Server listening on port 3300!");
});
