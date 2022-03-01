chrome.runtime.onInstalled.addListener((details) =>
{
    console.log("Installed");
});
self.addEventListener('message', function (msg) {
    console.log(msg.data);
});

var color = '#ffffff';

export async function updateBackgroundColor(newColor) {
    color = newColor;
    
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true }); 
    chrome.scripting.executeScript({ 
        target: { tabId: tab.id }, 
        function: setBackgroundColor
    });
}

function setBackgroundColor() {
    document.body.style.backgroundColor = color;
}