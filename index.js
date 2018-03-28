var path = require('path');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var compression = require('compression');
var helmet = require('helmet');

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

app.use(helmet());
app.use(compression()); //Compress all routes
app.use(express.static('public'))

app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, 'public/index.html'), function(err) {
    if (err) {
      res.status(500).send(err)
    }
  })
})

var server = app.listen(3300, function () {
  console.log("Server listening on port 3300!");
});
