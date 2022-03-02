chrome.runtime.onInstalled.addListener((details) =>
{
    console.log("Installed");
});
self.addEventListener('message', function (msg) {
    console.log(msg.data);
});