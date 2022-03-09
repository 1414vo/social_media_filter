// Console message when extension installed
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

// Message handler function
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