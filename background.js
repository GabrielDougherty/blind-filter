let messageStore = {};

// Listen for messages from content scripts
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    // Store message from content script with tab ID as key
    if (sender.tab && (message.type === "BLOCK_COUNT")) {
        const tabId = sender.tab.id;
        messageStore[tabId] = message;

        // Send acknowledgment back to content script
        sendResponse({ status: "Message received by background script" });
        return true; // Keep message channel open for async response
    }

    // Handle requests from popup
    if (message.type === "GET_CONTENT_DATA") {
        const tabId = message.tabId;
        sendResponse({
            data: messageStore[tabId] || null
        });
        return true;
    }
});