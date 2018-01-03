var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");


var axios = require("axios");
var cheerio = require("cheerio");


var db = require("./models");

var PORT = 3000;

var app = express();

app.use(logger("dev"));
// Use body-parser for handling form submissions
app.use(bodyParser.urlencoded({ extended: false }));
// Use express.static to serve the public folder as a static directory
app.use(express.static("public"));


require("./routes/api-routes.js")(app);

// Set mongoose to leverage built in JavaScript ES6 Promises
// Connect to the Mongo DB
mongoose.Promise = Promise;
mongoose.connect("mongodb://localhost/cartmedb", {
  useMongoClient: true
});

// var userSeed =
//   {
//   username: "Hillary Ellis",
//   facebook_id: "10159656190100043",
//   profile_pic: "https://scontent.xx.fbcdn.net/v/t1.0-1/23794760_10159537915520043_5375534390358626231_n.jpg?oh=b0eb54232a702b5e90210e51c9f29232&oe=5AF1F972",
//   };


//   db.User
//   .create(userSeed)
//   .then(function(dbUser) {
//     console.log(dbUser);
//   })
//   .catch(function(err) {
//     console.log(err.message);
//   });



// Start the server
app.listen(PORT, function() {
  console.log("App running on port " + PORT + "!");
});

