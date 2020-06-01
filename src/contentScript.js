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
    const { suggestedQuery } = getClosestQuery(currentElement, request.variant);
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
  let suggestedQuery = null;
  let nextEl = element;
  while (!suggestedQuery && nextEl !== document) {
    suggestedQuery = window.TestingLibraryDom.getSuggestedQuery(
      nextEl,
      variant
    );

    nextEl = nextEl.parentElement;
  }

  // Why use javascript if you can't use eval from time to time.  Deal with it. 😎
  // eslint-disable-next-line no-eval
  const proposed = window.eval(
    `window.TestingLibraryDom.screen.${suggestedQuery
      .toString()
      .replace("get", "queryAll")}`
  );

  const exactIndex = proposed.findIndex((el) => el === element);

  const length = proposed.length;

  return { suggestedQuery, length, exactIndex };
}

function showElement(el) {
  const { suggestedQuery, length, exactIndex } = getClosestQuery(el, "get");
  Bridge.sendMessage(
    "show-suggestion",
    {
      suggestedQuery: suggestedQuery.toString(),
      length,
      exactIndex,
      element: el,
    },
    "devtools"
  );
}

window.showElement = showElement;

const scriptTag = document.createElement("script");
scriptTag.src = chrome.runtime.getURL(
  "node_modules/@testing-library/dom/dist/@testing-library/dom.umd.min.js"
);

scriptTag.onload = function onload() {
  this.remove();
};
(document.head || document.documentElement).appendChild(scriptTag);
