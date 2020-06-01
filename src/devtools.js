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
  Bridge.onMessage(
    "show-suggestion",
    ({ data: { suggestedQuery, exactIndex, length } }) => {
      const isExact = exactIndex >= 0;
      if (length > 1) {
        suggestedQuery = suggestedQuery.replace("get", "getAll");

        if (isExact) {
          suggestedQuery += `[${exactIndex}]`;
        }
      }
      sidebar.setObject(
        { suggestedQuery },
        isExact
          ? "This query will get this precise element"
          : "{!} Closest available query, try improving a11y of this element.."
      );
    }
  );
  chrome.devtools.panels.elements.onSelectionChanged.addListener(() => {
    chrome.devtools.inspectedWindow.eval("window.showElement($0)", {
      useContentScriptContext: true,
    });
  });
});
