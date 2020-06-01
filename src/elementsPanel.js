const Bridge = require("crx-bridge").default;

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
    const message = document.querySelector("#message");
    message.className = isExact ? "good" : "warn";
    message.innerHTML = isExact
      ? "<span style='font-size:20px;'>&#9989;</span> This query will get this precise element"
      : "<span style='font-size:20px;'>&#9888;</span> This is the closest available query, try improving accessibility of this element.";
    document.querySelector(
      "#query-code"
    ).innerText = `screen.${suggestedQuery}`;
    //   document.write(suggestedQuery)

    //   sidebar.setObject(
    //     { suggestedQuery },
    // isExact
    //   ? "This query will get this precise element"
    //   : "{!} Closest available query, try improving a11y of this element.."
    //   );
  }
);

document.addEventListener("DOMContentLoaded", () => {
  // Handler when the DOM is fully loaded
  // console.log("Hereeeee")
  // document.write("Foo")
  document.querySelector("button").addEventListener("click", () => {
    Bridge.sendMessage(
      "run-query-in-console",
      { query: document.querySelector("#query-code").innerText },
      "content-script"
    );
  });
});
