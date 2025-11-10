// Service Worker (worker.ts) - The brain of the extension.

// Listen for messages coming from the content scripts (pages)
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  // Message received from the content script (main.ts)
  if (message.type === "CONTENT_SCRIPT_LOADED") {
    const currentUrl = sender.tab?.url ?? "Unknown URL";

    // 1. Log the URL from the message sender
    console.log(`[SERVICE WORKER] Content script loaded on: ${currentUrl}`);

    // 2. Query all tabs to get the tab count (requires "tabs" permission)
    chrome.tabs.query({}, (tabs) => {
      const tabCount = tabs.length;
      console.log(`[SERVICE WORKER] Total open tabs: ${tabCount}`);

      // 3. Send a response back to the Content Script
      sendResponse({
        status: "OK",
        tabCount: tabCount,
      });
    });

    // IMPORTANT: Return true to indicate you will call sendResponse asynchronously
    return true;
  }
});

console.log("[SERVICE WORKER] Initial startup complete. Awaiting events...");
