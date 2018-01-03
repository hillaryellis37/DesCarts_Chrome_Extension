var db = require("../models");
var axios = require("axios");
var cheerio = require("cheerio");

module.exports = function(app) {
  
  	app.get("/user", function(req, res) {
	    db.User
		.find({})
		.then(function(dbUser) {
			res.json(dbUser);
		})
		.catch(function(err) {
		    res.json(err);
		});
  	});

  	app.get("/carts", function(req, res) {
	    db.Cart
		.find({})
		.then(function(dbUser) {
			res.json(dbUser);
		})
		.catch(function(err) {
		    res.json(err);
		});
  	});



  	app.post("/cart", function(req, res) {
	  	db.Cart
		.create(req.body)
		.then(function(dbCart) {
		    return db.User.findOneAndUpdate({}, { $push: { carts: dbCart._id } }, { new: true });
		})
		.then(function(dbUser) {
		    res.json(dbUser);
		})
		.catch(function(err) {
		    res.json(err);
		});
	});

  	app.post("/item", function(req, res) {
	  	db.Item
		.create(req.body)
		.then(function(dbItem) {
		    return db.Cart.findOneAndUpdate({}, { $push: { items: dbItem._id } }, { new: true });
		})
		.then(function(dbCart) {
		    res.json(dbCart);
		})
		.catch(function(err) {
		    res.json(err);
		});
	});

};