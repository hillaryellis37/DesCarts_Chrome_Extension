var db = require("../models");
var axios = require("axios");
var cheerio = require("cheerio");

module.exports = function(app) {
  
  	app.get("/users", function(req, res) {
	    db.User
		.find({})
		.populate("carts")
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
		.populate("items")
		.then(function(dbUser) {
			res.json(dbUser);
		})
		.catch(function(err) {
		    res.json(err);
		});
  	});

	app.post("/carts/:id", function(req, res) {
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

	app.post("/items/:id", function(req, res) {
	    db.Item
	    .create(req.body)
	    .then(function(dbItem) {
	    	console.log('im here', dbItem)
	      return db.Cart
	      .update({ _id: req.params.id }, { $push: { items: dbItem._id  } })
	      .catch(err=> console.error(err));
	    })
	    .then(function(seeItem) {
	      res.json(seeItem);

	    })
	    .catch(function(err) {
	      res.json(err);
	    });

    });


};