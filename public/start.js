var active_categories = new Set();

function set_to_json(set){
    json_string = "[";

    var addComma = false;

    for (let element of set){
        if (addComma) json_string += ",";
        json_string += element;
        addComma = true;
    }

    return json_string + "]";
}

chrome.runtime.onInstalled.addListener((details) =>
{
    console.log("Installed");
});
self.addEventListener('message', function (msg) {
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