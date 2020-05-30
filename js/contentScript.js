// let suggestedQuery = null;
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

function getClosestQuery(element, variant) {
  let query = null;
  let nextEl = element;
  while (!query && nextEl !== document) {
    query = window.TestingLibraryDom.getSuggestedQuery(nextEl, variant);
    nextEl = nextEl.parentElement;
  }

  return query;
}

chrome.runtime.onMessage.addListener((request) => {
  if (request.type == "getSuggestedQuery") {
    const suggestedQuery = getClosestQuery(currentElement, request.variant);
    if (suggestedQuery) {
      navigator.clipboard.writeText(suggestedQuery.toString());
    }
  }
});
