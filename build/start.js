<<<<<<< refs/remotes/origin/main
var categories = new Set([1,2,3]);
=======
var active_categories = new Set();
>>>>>>> HTTP requests

function set_to_json(set){
    json_string = "[";

    var addComma = false;

    for (let element of set){
        if (addComma) json_string += ",";
<<<<<<< refs/remotes/origin/main
        json_string += "\"" + element + "\"";
=======
        json_string += element;
>>>>>>> HTTP requests
        addComma = true;
    }

    return json_string + "]";
}

chrome.runtime.onInstalled.addListener((details) =>
{
    console.log("Installed");
});

categoryMap = [];
primaryList = [];
secondaryList = [];
avoidList = [];

self.addEventListener('message', function (msg) {
<<<<<<< refs/remotes/origin/main
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
=======
    console.log("ServiceWorkerMsg:")
    console.log(msg.data);
    if (msg.data.isOn){
        active_categories.add(msg.data.category)
    } else {
        active_categories.delete(msg.data.category);
    }
    console.log(active_categories);
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, set_to_json(active_categories));
    });
});
>>>>>>> HTTP requests
