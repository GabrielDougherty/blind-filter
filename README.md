# Blind Filter

Chrome extension to filter posts on teamblind.com

# Build

```
npm install
npm install -g npx
npx tailwindcss build styles.css -o output.css
```

Then import as a Chrome extension

# Logging

To enable logging, uncomment the line at the top of [content-script.js](content-script.js) and [filter-editor.js](filter-editor.js)

```
// uncomment to debug
console.log = function() {}
```
