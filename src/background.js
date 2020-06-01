const Bridge = require("crx-bridge").default;

Bridge.onMessage("show-notification", ({ data: { notification } }) => {
  chrome.notifications.create(notification);
});

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
    chrome.windows.update(tab.windowId, { focused: true }, () => {
      chrome.tabs.update(tab.id, { active: true }, () => {
        chrome.tabs.sendMessage(tab.id, {
          type: "getSuggestedQuery",
          variant: info.menuItemId,
        });
      });
    });
    // Set focus on tab
  }
});
