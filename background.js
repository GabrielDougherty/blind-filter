// const blindUrlPrefix = 'https://www.teamblind'

// // When the user clicks on the extension action
// chrome.tabs.onCreated.addListener(async (tab) => {
// if (tab.url.startsWith(blindUrlPrefix)) {
//   // Set the action badge to the next state
//   await chrome.action.setBadgeText({
//     tabId: tab.id,
//     text: 0
//   });
// }
// });
// chrome.tabs.onUpdated.addListener(async (tab) => {
//   if (tab.url.startsWith(blindUrlPrefix)) {
//     // Set the action badge to the next state
//     await chrome.action.setBadgeText({
//       tabId: tab.id,
//       text: "HELLO"
//     });
//   }
//   });