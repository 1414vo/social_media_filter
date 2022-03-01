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