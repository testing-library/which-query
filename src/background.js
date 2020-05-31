const Bridge = require("crx-bridge").default;

Bridge.onMessage(
  "connect",
  () =>
    new Promise((res) => {
      res("connected");
    })
);

const contextMenuItem = {
  id: "whichQuery",
  title: "Testing Library",
  contexts: ["all"],
};

const variants = ["get", "getAll", "query", "queryAll", "find", "findAll"];

chrome.contextMenus.create(contextMenuItem, () => {
  for (const variant of variants) {
    chrome.contextMenus.create({
      id: variant,
      parentId: "whichQuery",
      title: `Copy as ${variant}By`,
      contexts: ["all"],
    });
  }
});
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.parentMenuItemId === "whichQuery") {
    chrome.tabs.sendMessage(tab.id, {
      type: "getSuggestedQuery",
      variant: info.menuItemId,
    });
  }
});
