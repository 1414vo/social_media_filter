chrome.runtime.onInstalled.addListener(() => {
  console.log("Extension installed!");
});
chrome.webNavigation.onCompleted.addListener(() => replaceFirstTweet());

async function replaceFirstTweet (){
    var tabs = await chrome.tabs.query({ currentWindow: true, active: true });
    console.log(tabs);
    console.log(window.document);
    if (tabs[0].url.indexOf("twitter.com") != -1) {
        console.log("Twitter load complete");
        var firstTweet = document.querySelector('[data-testid="tweet"]');
        firstTweet.replaceWith("Replaced tweet");
    }     
};