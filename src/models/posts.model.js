const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Posts = new Schema({
  text: {
    type: String,
  },
  name: {
    type: String,
  },
  company: {
    type: String,
  },
});

module.exports = mongoose.model("Posts", Posts);
