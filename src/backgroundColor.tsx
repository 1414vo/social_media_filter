export async function changeBackgroundColor() {
    await chrome.tabs.query({active: true, currentWindow: true}, 
    (
      r => {
        chrome.scripting.executeScript(r[0].id!, {file: './changeBackgroundColor.js'})
      }
    ));
}