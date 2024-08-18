const mongoose = require('mongoose');
const schema = mongoose.Schema({
  Title: String,
  content: String,
  blogId: String,
  img_url: String,
});

module.exports = mongoose.model('Model', schema);