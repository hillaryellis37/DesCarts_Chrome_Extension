var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var UserSchema = new Schema({

  username: {
    type: String,
    required: true
  },
  facebook_id: {
    type: String,
    required: true
  },

  profile_pic: {
    type: String,
    required: true
  },
  carts: {
    type: Schema.Types.ObjectId,
    ref: "Cart"
  }
});

var User = mongoose.model("User", UserSchema);

module.exports = User;
