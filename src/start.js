chrome.runtime.onInstalled.addListener(() => {
  console.log("Extension installed!");
});
chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  if(changeInfo.status === "complete" && tab.status == "complete") {
    console.log(tab.status, changeInfo.status);
    console.log("update!");
    if (tab.url.indexOf("twitter.com") != -1) {
        console.log("Twitter load complete");
        chrome.scripting.executeScript({
          target: {tabId: tabId},
          func: changeFirstTweet,
        });
        ;
    }  
  } 
});

function changeFirstTweet() {
  var firstTweet = document.querySelector('[data-testid="tweet"]');
  firstTweet.replaceWith("Replaced tweet")
}