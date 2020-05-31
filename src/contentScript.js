const Bridge = require("crx-bridge").default;
Bridge.onMessage("connect", () => {
  //needed to establish connection
  return "connected";
});

let currentElement = null;

document.addEventListener(
  "contextmenu",
  (event) => {
    if (event.target) {
      currentElement = event.target;
    }
  },
  true
);

chrome.runtime.onMessage.addListener((request) => {
  if (request.type == "getSuggestedQuery") {
    const suggestedQuery = getClosestQuery(currentElement, request.variant);
    if (suggestedQuery) {
      navigator.clipboard.writeText(suggestedQuery.toString()).then(
        () => {},
        () => {
          // eslint-disable-next-line no-console
          console.log(suggestedQuery.toString());
          // eslint-disable-next-line no-console
          console.warn(
            "Can't copy query to clipboard when focus is not in the browser."
          );
        }
      );
    }
  }
});

function getClosestQuery(element, variant) {
  let query = null;
  let nextEl = element;
  while (!query && nextEl !== document) {
    query = window.TestingLibraryDom.getSuggestedQuery(nextEl, variant);
    nextEl = nextEl.parentElement;
  }

  return query;
}

const variants = ["get", "getAll", "query", "queryAll", "find", "findAll"];

function showElement(el) {
  const suggestion = getClosestQuery(el, "get").toString();
  const suggestedQueries = variants.map((variant) =>
    suggestion.replace("get", variant)
  );
  Bridge.sendMessage("show-el", { suggestedQueries }, "devtools");
}

window.showElement = showElement;
