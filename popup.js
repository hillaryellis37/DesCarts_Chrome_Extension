/**
	This is the popup.js file, used to receive the list of urls that the grabber content script has found and expose them to the popup.html file.
**/
var title = "";
var url = "";
var image = "";
var CARTS = [];

$("#cart-container").on("click", ".savedcart", function() {
  var cartID = $(this).attr("data-cart");
  var cartName = $(this).attr("data-name");

    $.ajax({
      method: "POST",
      url: "http://localhost:3000/item/" + cartID,
      data: {
        item_name: title,
        url: url,
        image: image
      }
    }).done(function(dbItem){
      console.log(dbItem);
      $("body").empty();
      var confirmationDiv = "<div class='flex-container'>" +
                              "<div class='confirmation-container'>"+
                                "<p>Added to " + cartName + "</p>" + 
                                "<hr>" +
                                "<img src=" + image + " width=40%, height=40%>"+
                                "<hr>" +
                                "<div id='close-window'>"+
                                  "<img src='http://www.rib-x.co.uk/wp-content/uploads/2017/04/Rib-logo-1.svg' width=10%, height=10%>"+
                                  "<p id='close-ext'>Close</p>"+
                              "</div>" +
                            "</div>";

      $("body").append(confirmationDiv);
    });
});

$("body").on("click", "#close-window", function() {
  window.close();
});

$("#add-new-cart").on("click", function() {
  var cartname = $("#cart-name").val().trim();
  var bgurl = $("#bg-url").val().trim();

    $.ajax({
      method: "POST",
      url: "http://localhost:3000/cart/5a4c8be836136c47c938cdb3",
      data: {
        cart_name: cartname,
        bg_url: bgurl,
      }
    }).done(function(dbCart){
      console.log(dbCart);

    });
});


function loadXMLDoc() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {

      CARTS = JSON.parse(this.response);

      for (var i = 0; i < CARTS.length; i++) {
        var id = CARTS[i]._id;
        var cartname = CARTS[i].cart_name;
        var bgurl = CARTS[i].bg_url;

        // var cartContainer = document.createElement("div");
        // document.getElementById("cart-container").appendChild(cartContainer);

        var cartDiv = "<div class='item savedcart' data-name='" + cartname + "' data-cart='" + id + "'>" +
                        "<img class='item item-image' src='" + bgurl + "'>" +
                        "<div class='description'>" + cartname + " +" + "</div>" +
                      "</div>";
        
        $("#cart-container").prepend(cartDiv);    
      }
    }
  };
  xhttp.open("GET", "http://localhost:3000/carts/", true);
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

  var titleDiv = "<p>" + title + "</p>";
  $("#title").append(titleDiv);

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

    var imgDiv = "<div class='d-flex justify-content-center'>" +
                      "<img src=" + picUrls[0].src + " width=60%, height=60%>"+
                    "</div>";

    $("#imgContainer").append(imgDiv);

  }
  else{
    console.log("nothing big enough");
    document.body.innerHTML = "Unable to detect item. Try reloading your current Browser tab";
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