var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var CartSchema = new Schema({
  cart_name: {
    type: String,
    required: true
  },
  bg_url: {
    type: String,
    required: false
  },
  items: {
    type: Schema.Types.ObjectId,
    ref: "Item"
  }
});

var Cart = mongoose.model("Cart", CartSchema);
module.exports = Cart;
