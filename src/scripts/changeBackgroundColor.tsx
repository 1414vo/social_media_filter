export function changeColor() {
    chrome.storage.sync.get(["color"], (data) => {
        document.body.style.backgroundColor = data.color;
    });
}