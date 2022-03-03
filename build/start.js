import {changeColor} from "./changeBackgroundColor.js";

chrome.runtime.onInstalled.addListener((details) =>
{
    console.log("Installed");
});
self.addEventListener('message', function (msg) {
    console.log(msg.data);
    if (msg.data['color']) {
        changeColor(msg.data['color']);
    }
});