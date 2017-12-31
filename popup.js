/**
	This is the popup.js file, used to receive the list of urls that the grabber content script has found and expose them to the popup.html file.
**/
var title = "";
var url = "";
var image = "";

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
    console.log(tabs);

    });
  });
}

function get_urls() {
  var picUrls = chrome.extension.getBackgroundPage().IMAGE_URLS;
  if (picUrls.length > 0){
  	console.log("The popup.js is working")
      	
  	// create a container object for the list
  	var listContainer = document.createElement("div");	
  	// add it to the DOm
  	document.getElementById("ulContainer").appendChild(listContainer);
  	// create a ul object for the list items
  	var listElement = document.createElement("ul");
  	// add that to the DOm
    listContainer.appendChild(listElement);


    var listItem = document.createElement("li");
    listItem.innerHTML = "<img src=" + picUrls[0].src + " width=25%, height=25%>";
    listElement.appendChild(listItem);
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
}

// when the page loads, remove the gif and execute the rest
window.onload = ceaseLoading()