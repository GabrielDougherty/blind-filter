"use strict";

// uncomment to debug
console.log = function() {}

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