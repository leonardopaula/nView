var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var NewsSchema   = new Schema({
    url: String,
    name: String
});

module.exports = mongoose.model('News', NewsSchema);