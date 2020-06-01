const Bridge = require("crx-bridge").default;
// screen is used by the eval below.  😎
// eslint-disable-next-line no-unused-vars
const { screen, getSuggestedQuery } = require("@testing-library/dom");

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

Bridge.onMessage("run-query-in-console", ({ data: { query } }) => {
  /* eslint-disable  */
  console.log(query);
  console.log(eval(query));
  /* eslint-enable */
});

const CANT_COPY_NOTIFICATION = {
  type: "basic",
  iconUrl: "icons/icon64.png",
  title: "Can't Copy Query",
  message: "Check browser console for details.",
  contextMessage: "Are you are debugging?",
};

chrome.runtime.onMessage.addListener((request) => {
  if (request.type == "getSuggestedQuery") {
    const { suggestedQuery } = getClosestQuery(currentElement, request.variant);
    if (suggestedQuery) {
      const queryToCopy = `screen.${suggestedQuery.toString()}`;
      navigator.clipboard.writeText(queryToCopy).then(
        () => {
          // TODO: add option to toggle this
          Bridge.sendMessage(
            "show-notification",
            {
              notification: {
                type: "basic",
                iconUrl: "icons/icon64.png",
                title: "Copied Query",
                message: queryToCopy,
              },
            },
            "background"
          );
        },
        (err) => {
          /* eslint-disable no-console */
          Bridge.sendMessage(
            "show-notification",
            { notification: CANT_COPY_NOTIFICATION },
            "background"
          );

          // TODO: figure this crap out https://github.com/testing-library/which-query/issues/9
          console.warn(
            `
Can't copy query to clipboard when focus is not in the browser.
Click in the page and be sure devtools does not have focus when using Testing Library copy menus.
Know how to fix this issue? Pull Requests welcome: https://github.com/testing-library/which-query/issues/9
`,
            err
          );
          console.log("Here is the query you tried to copy:");
          console.log(queryToCopy);
          /* eslint-enable no-console */
        }
      );
    }
  }
});

function getClosestQuery(element, variant, { doValidate = false } = {}) {
  let suggestedQuery = null;
  let nextEl = element;
  while (!suggestedQuery && nextEl !== document) {
    suggestedQuery = getSuggestedQuery(nextEl, variant);

    nextEl = nextEl.parentElement;
  }

  let validations = {};
  if (doValidate) {
    // Why use javascript if you can't use eval from time to time.  Deal with it. 😎
    // eslint-disable-next-line no-eval
    const proposed = eval(
      `screen.${suggestedQuery.toString().replace("get", "queryAll")}`
    );

    const exactIndex = proposed.findIndex((el) => el === element);

    const length = proposed.length;
    validations = { exactIndex, length };
  }

  return { suggestedQuery, ...validations };
}

function showElement(element) {
  const { suggestedQuery, length, exactIndex } = getClosestQuery(
    element,
    "get",
    {
      doValidate: true,
    }
  );
  Bridge.sendMessage(
    "show-suggestion",
    {
      suggestedQuery: suggestedQuery.toString(),
      length,
      exactIndex,
      element,
    },
    "devtools"
  );
}

window.showElement = showElement;
function injectScript(scriptPath) {
  return new Promise((resolve) => {
    const scriptTag = document.createElement("script");
    scriptTag.src = chrome.runtime.getURL(scriptPath);

    scriptTag.onload = function onload() {
      resolve();
      this.remove();
    };
    (document.head || document.documentElement).appendChild(scriptTag);
  });
}

injectScript(
  "node_modules/@testing-library/dom/dist/@testing-library/dom.umd.min.js"
).then(() => {
  injectScript("src/globals.js");
});
