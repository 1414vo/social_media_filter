chrome.runtime.onInstalled.addListener((details) =>
{
    console.log("Installed");
});

categoryMap = [];
primaryList = [];
secondaryList = [];
avoidList = [];

self.addEventListener('message', function (msg) {
    if(msg.data['changeCategory']){
        console.log(msg, msg.data.changeCategory);
        categoryMap = Array.from(msg.data.changeCategory);
        this.chrome.storage.sync.set({'categoryMap': categoryMap});
        console.log(categoryMap);
    }
    if(msg.data['changeLists']) {
        console.log(msg);
        primaryList = msg.data['changeLists'].primaryList;
        secondaryList = msg.data['changeLists'].secondaryList;
        avoidList = msg.data['changeLists'].avoidList;
        this.chrome.storage.sync.set({'primaryList': primaryList, 'secondaryList': secondaryList, 'avoidList': avoidList});
        console.log(categoryMap);
    }
});

setInterval(() => {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {categories: set_to_json(categories)});
    }); 
}, 1000);