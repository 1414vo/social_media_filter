// Console message when extension installed
chrome.runtime.onInstalled.addListener((details) =>
{
    console.log("Installed");
});

categoryMap = [];
primaryList = [];
secondaryList = [];
avoidList = [];

// Message handler function
self.addEventListener('message', function (msg) {
    // If the message has a "changeCategory" entry, update the category map with the categories from the message
    // This ensures it is persistant when the popup/browser closes and allows it to be accessed by the content script ("parse.js")
    if(msg.data['changeCategory']){
        console.log(msg, msg.data.changeCategory);
        categoryMap = Array.from(msg.data.changeCategory);
        this.chrome.storage.sync.set({'categoryMap': categoryMap});
        console.log(categoryMap);
    }
    // If the message has a "changeLists" entry, update the primary, secondary and avoid lists
    // This ensures it is persistant when the popup/browser closes. (It is not needed by the content script, only UI).
    if(msg.data['changeLists']) {
        console.log(msg);
        primaryList = msg.data['changeLists'].primaryList;
        secondaryList = msg.data['changeLists'].secondaryList;
        avoidList = msg.data['changeLists'].avoidList;
        this.chrome.storage.sync.set({'primaryList': primaryList, 'secondaryList': secondaryList, 'avoidList': avoidList});
        console.log(categoryMap);
    }
    
});

