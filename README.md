# Blind Filter

![Blind Filter logo](images/icon-128.png)

Chrome extension to filter posts on teamblind.com

## Installation

Install via the Chrome Web Store: [Blind Filter](https://chrome.google.com/webstore/detail/blind-filter/ppgjndjoddgkkijdfbkdlfichoilfhfd)

## Build

```
npm install
npm install -g npx
npx tailwindcss build styles.css -o output.css
```

Then import as a Chrome extension via developer mode

## Logging

To enable logging, uncomment the line at the top of [content-script.js](content-script.js) and [filter-editor.js](filter-editor.js)

```
// uncomment to debug
console.log = function() {}
```
