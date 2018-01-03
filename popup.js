/**
	This is the popup.js file, used to receive the list of urls that the grabber content script has found and expose them to the popup.html file.
**/
var title = "";
var url = "";
var image = "";
var CARTS = [];


function loadXMLDoc() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {

      CARTS = JSON.parse(this.response);

      for (var i = 0; i < CARTS.length; i++) {
        var id = CARTS[i]._id;
        var cartname = CARTS[i].cart_name;
        var bgurl = CARTS[i].bg_url;

        var cartContainer = document.createElement("div");
        document.getElementById("cart-container").appendChild(cartContainer);

        var cartdiv = "<div class='item' data-cart='" + id + "'>" +
                        "<img class='item item-image' src='" + bgurl + "'>" +
                        "<div class='description'>" + cartname + " +" + "</div>"
                      "</div>";
        cartContainer.innerHTML = cartdiv;       
      }
    }
  };
  xhttp.open("GET", "http://localhost:3000/carts", true);
  xhttp.send();
}



function get_url_and_title() {

  chrome.windows.getCurrent(function(win){
  chrome.tabs.getAllInWindow(win.id, function(tabs){


  for (var i = 0; i < tabs.length; i++) {
        
    if (tabs[i].active === true) {
      title = tabs[i].title;
      url = tabs[i].url;
    }     
  }

    console.log("title:", title);
    console.log("url:" , url);
    console.log("image:", image);

    });
  });
}

function get_urls() {
  var picUrls = chrome.extension.getBackgroundPage().IMAGE_URLS;
  if (picUrls.length > 0){
    image = picUrls[0].src;
  	console.log("The popup.js is working")
      	
  	// create a container object for the list
  	var imgContainer = document.createElement("div");	
  	// add it to the DOm
  	document.getElementById("imgContainer").appendChild(imgContainer);

    imgContainer.innerHTML = "<img src=" + picUrls[0].src + " width=50%, height=50%>"+
                             "<div class='title'>"+
                                "<p>" + title + "</p>"+
                             "</div>"+
                             "<div>"+
                                "<p>Select a cart or create a new cart to save your item!</p>"
                             "</div>";
  }
  else{
    console.log("nothing big enough");
    document.body.innerHTML = "Unable to detect item.";
  }
}

function ceaseLoading(){
  try{
    var loader = document.getElementById("loadingImage");
    loader.style.display = "none";
    var content = document.getElementById("content");
    content.style.display = "block";
  }
  catch(err){
    console.log(err);
  }
  //start loading the rest of the script
  get_url_and_title();
  get_urls();
  loadXMLDoc();
}

// when the page loads, remove the gif and execute the rest
window.onload = ceaseLoading()