var Schema = require('mongoose').Schema;
var db = require('../config/db');

var Image = db.model('Image', {
  _user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  name: String,
  date: {
    type: Date,
    default: Date.now
  },
  comment: String,
  data: String
});

module.exports = Image;
