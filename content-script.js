"use strict";

// comment to debug
console.log = function() {}

var blocklist = []
var blockcount = 0

chrome.storage.local.get('blindFilterText', (result) => {
    console.log('Value currently is ' + result.blindFilterText);
    blocklist = result.blindFilterText?.split('\n').filter((a) => a.length > 0) || []
});

function doWork(node) {
    if (typeof node.getElementsByClassName !== 'function') {
        return
    }

    if (location.href.endsWith('user/history')) {
        return
    }


    chrome.runtime.sendMessage({ 'type': 'BLOCK_COUNT', 'data': blockcount }, _ => {
    });

    let a = node.getElementsByTagName('article')
    for (let b of a) {
        for (let c of blocklist) {
            if (b.innerHTML.toLowerCase().includes(c)) {
                blockcount++;
                chrome.runtime.sendMessage({ 'type': 'BLOCK_COUNT', 'data': blockcount }, _ => {
                });
                console.log('blocking element that has ' + c)
                b.remove()
                break
            }
        }
    }
}

doWork(document)

var observer = new MutationObserver(function (mutations) {
    console.log('detected mutation')
    for (let mutation of mutations) {
        for (let node of mutation.addedNodes) {
            doWork(node.getRootNode())
        }
    }
})
observer.observe(document.documentElement, {
    subtree: true,
    childList: true,
    characterData: true,
    attribute: true
});

chrome.runtime.onMessage.addListener(async text => {
    console.log("received " + text)
    blocklist = text.split('\n').filter((a) => a.length > 0)
    console.log("blocklist: ", blocklist)
});