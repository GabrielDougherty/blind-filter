"use strict";

// comment to debug
console.log = function () { }
async function sendMessageToBlindTabs(text) {
    const tabs = await chrome.tabs.query({ 'url': "*://*.teamblind.com/*" });

    tabs.forEach(async (tab) => {
        console.log('handling tab', tab)
        await chrome.tabs.sendMessage(tab.id, text);
    });
}
chrome.storage.local.get('blindFilterText').then((result) => {
    console.log('Value currently is ' + result.blindFilterText);
    document.getElementById("message").innerHTML = result.blindFilterText || ''
});

document.getElementById("button").onclick = async () => {
    await sendMessageToBlindTabs(document.getElementById("message").value);
    await chrome.storage.local.set({ 'blindFilterText': document.getElementById("message").value });
    console.log('Setting ' + document.getElementById("message").value)
};


// Get the current tab ID when popup opens
chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    const currentTabId = tabs[0].id;
    fetchContentMessages(currentTabId);
    setInterval(() => fetchContentMessages(currentTabId))
});

function fetchContentMessages(tabId) {
    // Request data from background script
    chrome.runtime.sendMessage(
        { type: "GET_CONTENT_DATA", tabId: tabId },
        function (response) {
            displayMessages(response);
        }
    );
}
function displayMessages(response) {
    const container = document.getElementById('button2');

    if (response && response.data) {
        // Clear container
        container.textContent = ''
        container.textContent += `Blocked ${response.data.data} posts`
    }
}