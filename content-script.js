"use strict";

var blocklist = []

chrome.storage.local.get('blindFilterText', (result) => {
    console.log('Value currently is ' + result.blindFilterText);
    blocklist = result.blindFilterText?.split('\n') || []
});

function doWork(node) {
    if (typeof node.getElementsByClassName !== 'function') {
        return
    }

    let a = node.getElementsByClassName('h_tit')
    for (let b of a) {
        for (let c of blocklist) {
            if (b.innerHTML.toLowerCase().includes(c)) {
                console.log('blocking element that has ' + c)
                b.parentElement.parentElement.parentElement.remove()
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
    blocklist = text.split('\n')
    console.log("blocklist: ", blocklist)
});