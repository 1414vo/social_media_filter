// Console message when extension installed
chrome.runtime.onInstalled.addListener((details) =>
{
    console.log("Installed");
});

active_categories = new Set();
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
        active_categories = new Set();
        /*
        for(const el of categoryMap){
            console.log(el);
            if(el[1]){
                active_categories.add(el[0]);
            }
        }*/
        console.log(active_categories);
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

