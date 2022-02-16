chrome.runtime.onInstalled.addListener(() => {
  //chrome.storage.sync.set({ color });
  console.log('Successful start');
});

self.addEventListener('message', function (msg) {
  console.log(msg.data);
})
