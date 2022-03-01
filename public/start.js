var categories = new Set([1,2,3]);

function set_to_json(set){
    json_string = "[";

    var addComma = false;

    for (let element of set){
        if (addComma) json_string += ",";
        json_string += "\"" + element + "\"";
        addComma = true;
    }

    return json_string + "]";
}

chrome.runtime.onInstalled.addListener((details) =>
{
    console.log("Installed");
});
self.addEventListener('message', function (msg) {
    console.log(msg.data);
});

setInterval(() => {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {categories: set_to_json(categories)});
    }); 
}, 1000);
