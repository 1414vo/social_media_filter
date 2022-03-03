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

async function changeBackgroundColor (color) {
    await chrome.tabs.query({active: true, currentWindow: true}, 
        (
          r => {
            chrome.scripting.executeScript({ 
                target: { tabId: r[0].id }, 
                files: ['changeBackgroundColor.js'], 
              });
        }
      ));
}
self.addEventListener('message', function (msg) {
    console.log(msg.data);

    if (msg.data['color']) {
        chrome.storage.sync.set({"color": msg.data['color']});
        changeBackgroundColor(msg.data['color']);
    }
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

