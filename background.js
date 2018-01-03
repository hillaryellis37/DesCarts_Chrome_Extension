var IMAGE_URLS = []



chrome.extension.onMessage.addListener(
    function(request, sender, sendResponse) {
      console.log(request.Dir)
        switch (request.directive) {

        case "setImages":
          IMAGE_URLS = request.data;
          sendResponse({backgroundResponse: "Pictures grabbed!"});
          break;

        default:
            // helps debug when request directive doesn't match
            alert("Unmatched request of '" + request.directive + "' from script to background.js from " + sender);
        }
    }
);

// when the active tab is changed, execute the grabber script on it so we always have fresh information
chrome.tabs.onActivated.addListener(function(info) {
    var tab = chrome.tabs.get(info.tabId, function(tab) {
      chrome.tabs.executeScript(null, {file: "grabber.js"});
    });
});