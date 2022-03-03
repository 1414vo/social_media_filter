chrome.runtime.onInstalled.addListener((details) =>
{
    console.log("Installed");
});
self.addEventListener('message', function (msg) {
    console.log(msg.data);
    if (msg.data['color']) {
        chrome.storage.sync.set({"color": msg.data['color']});
        changeBackgroundColor(msg.data['color']);
    }
});

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
