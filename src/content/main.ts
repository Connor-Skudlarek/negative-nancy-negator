// Content Script (main.ts) - Runs on the webpage.
import { identifyAndTrackInputs } from "../utils/identify_and_track_inputs";
// Execute immediately when the script is injected
function initialize() {
  // Log the current URL directly from the Content Script (which has access to window)
  console.log(`[CONTENT SCRIPT] Script loaded on: ${window.location.href}`);
  identifyAndTrackInputs();
  // Send a message to the Service Worker to request the tab count
  // The Service Worker will be woken up by this call.
  chrome.runtime.sendMessage(
    {
      type: "CONTENT_SCRIPT_LOADED",
      url: window.location.href,
    },
    (response) => {
      if (response && response.status === "OK") {
        console.log(
          `[CONTENT SCRIPT] Response received from Service Worker. Total tabs: ${response.tabCount}`
        );
      } else {
        console.error(
          "[CONTENT SCRIPT] Failed to get tab count from Service Worker."
        );
      }
    }
  );
}

initialize();
