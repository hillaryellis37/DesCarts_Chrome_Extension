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
      // document.getElementById("get").innerHTML =
      // this.responseText;
      CARTS = this.response;
      console.log(CARTS);
    }
  };
  xhttp.open("GET", "http://localhost:3000/carts", true);
  xhttp.send();
}

// document.getElementById("get").addEventListener("click", loadXMLDoc);


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

    imgContainer.innerHTML = "<img src=" + picUrls[0].src + " width=25%, height=25%>";
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