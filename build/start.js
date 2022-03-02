chrome.runtime.onInstalled.addListener((details) =>
{
    console.log("Installed");
});

var color = '#ffffff';

self.addEventListener('message', function (msg) {
    console.log(msg.data);
    if (msg.data['color']) {
        this.chrome.storage.sync.set({'color': msg.data['color']});
    }
});