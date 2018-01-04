var db = require("../models");
var axios = require("axios");
var cheerio = require("cheerio");

module.exports = function(app) {
  
  	app.get("/users", function(req, res) {
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

	app.post("/cart/:id", function(req, res) {
	    db.Cart
	    .create(req.body)
	    .then(function(dbCart) {
	      return db.User.findOneAndUpdate({ _id: req.params.id }, { carts: dbCart._id }, { new: true });
	    })
	    .then(function(seeCart) {
	      res.json(seeCart);

	    })
	    .catch(function(err) {
	      res.json(err);
	    });

    });

	app.post("/item/:id", function(req, res) {
	    db.Item
	    .create(req.body)
	    .then(function(dbItem) {
	      return db.Cart.findOneAndUpdate({ _id: req.params.id }, { items: dbItem._id }, { new: true });
	    })
	    .then(function(seeItem) {
	      res.json(seeItem);

	    })
	    .catch(function(err) {
	      res.json(err);
	    });

    });


};