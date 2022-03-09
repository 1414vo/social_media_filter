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
    chrome.storage.sync.get(["time"], (data) => {
        const x = new Date().getTime();
        if (x - data.time > 3600000) {
            notifyUser();
            chrome.storage.sync.set({"time": x});
        }
    });
});

categoryMap = [];
primaryList = [];
secondaryList = [];
avoidList = [];

self.addEventListener('message', function (msg) {
    console.log(msg.data);

    // Notify user when the last attempt of the mood test is 1 hour ago
    // and the user is interacting with the extension right now
    chrome.storage.sync.get(["time"], (data) => {
        const x = new Date().getTime();
        if (x - data.time > 3600000) {
            notifyUser();
            chrome.storage.sync.set({"time": x});
        }
    });

    // For changing background color
    if (msg.data['color']) {
        console.log("Received color");
        chrome.storage.sync.set({"color": msg.data['color']});
    }
    // Message received after user completes mood test
    if (msg.data['completed']) {
        chrome.storage.sync.set({"completed": msg.data['completed']});
        chrome.storage.sync.set({"time": new Date().getTime()});
    }
    // ...
    if (msg.data['return']) {
        console.log("Waiting");
        chrome.storage.sync.get(["completed"], (data) => {
            if (msg.data.length > 0  && data.completed) {
                msg.data.moodtest.end_test();
            }
            console.log("Completed: ", msg);
        });
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

/**
 * Creates a Chrome notification and displays it to the user.
 */
function notifyUser() {
    chrome.notifications.create({
        title: 'Social Media Wellbeing Filter',
        message: 'You are ready for another mood test',
        iconUrl: 'images/logo32.png',
        type: 'basic'
    })
}