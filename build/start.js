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

categoryMap = [];
primaryList = [];
secondaryList = [];
avoidList = [];

self.addEventListener('message', function (msg) {

