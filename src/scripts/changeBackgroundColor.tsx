/**
 * Changes the background color to the colour retrieved from Chrome storage.
 */
export function changeColor() {
    chrome.storage.sync.get(["color"], (data) => {
        document.body.style.backgroundColor = data.color;
    });
}