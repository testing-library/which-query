const Bridge = require("crx-bridge").default;
const beautify = require("js-beautify").js;
const hljs = require("../lib/highlight.pack");
Bridge.onMessage(
  "show-suggestion",
  ({ data: { suggestedQuery, exactIndex, length } }) => {
    document.querySelector("#query-view").style = "display:inline";
    const isExact = exactIndex >= 0;
    if (length > 1) {
      suggestedQuery = suggestedQuery.replace("get", "getAll");

      if (isExact) {
        suggestedQuery += `[${exactIndex}]`;
      }
    }
    const message = document.querySelector("#message");
    message.className = isExact ? "good" : "warn";
    message.innerHTML = isExact
      ? "<span style='font-size:20px;'>&#9989;</span> This query will get this precise element"
      : "<span style='font-size:20px;'>&#9888;</span> This is the closest available query, try improving accessibility of this element.";

    const codeBlock = document.querySelector("#query-code");

    codeBlock.innerText = beautify(`screen.${suggestedQuery}`);

    hljs.highlightBlock(codeBlock);
  }
);

Bridge.onMessage("show-no-suggestion", () => {
  document.querySelector("#query-view").style = "display:none";
  const message = document.querySelector("#message");
  message.className = "warn";
  message.innerHTML =
    "<span style='font-size:20px;'>&#129300;</span> That element doesn't resolve to a query.";
});

document.addEventListener("DOMContentLoaded", () => {
  document.querySelector("button").addEventListener("click", () => {
    Bridge.sendMessage(
      "run-query-in-console",
      { query: document.querySelector("#query-code").innerText },
      "content-script"
    );
  });
});

// hljs.initHighlightingOnLoad();
