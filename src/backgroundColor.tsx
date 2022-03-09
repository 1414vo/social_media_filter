import { changeColor } from "./scripts/changeBackgroundColor";
/**
 * Changes the background color of the active tab (Twitter). 
 */
export async function changeBackgroundColor() {
    await chrome.tabs.query({active: true, currentWindow: true}, 
    (
      r => {
        chrome.scripting.executeScript({
            target: {tabId: r[0].id!}, 
            func: changeColor})
      }
    ));
}