const { screen, fireEvent } = require("@testing-library/dom");
const Screen = Object.getPrototypeOf(window.screen);

for (const func of Object.keys(screen)) {
  Screen[func] = screen[func];
}

window.fireEvent = fireEvent;
