chrome.runtime.onInstalled.addListener((details) =>
{
    console.log("Installed");
});

var color = '#ffffff';

self.addEventListener('message', function (msg) {
    console.log(msg.data);
    if (msg.data['color']) {
        color = msg.data['color'];
    }
});

async function changeBackgroundColor() {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true }); 
  
    chrome.scripting.executeScript({ 
      target: { tabId: tab.id }, 
      function: setBackgroundColor,
    });
}

function setBackgroundColor() {
    document.body.style.backgroundColor = color;
}