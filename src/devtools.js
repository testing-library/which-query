const Bridge = require("crx-bridge").default;

async function main() {
  //need to establish connection between background & contentScript.
  await Bridge.sendMessage("connect", { really: true }, "content-script");
}

main();

chrome.devtools.panels.create(
  "Which Query?",
  "icons/icon64.png",
  "/pages/panel.html"
);
chrome.devtools.panels.elements.createSidebarPane("Which Query?", (sidebar) => {
  Bridge.onMessage("show-el", ({ data: { suggestedQueries } }) => {
    sidebar.setObject({ suggestedQueries });
  });
  chrome.devtools.panels.elements.onSelectionChanged.addListener(() => {
    chrome.devtools.inspectedWindow.eval("window.showElement($0)", {
      useContentScriptContext: true,
    });
  });
});
