var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ItemSchema = new Schema({
  item_name: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  },
  image: {
    type: String,
    ref: true
  }
});

var Item = mongoose.model("Item", ItemSchema);
module.exports = Item;