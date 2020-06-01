const Screen = Object.getPrototypeOf(window.screen);

for (const func of Object.keys(window.TestingLibraryDom.screen)) {
  Screen[func] = window.TestingLibraryDom.screen[func];
}

window.fireEvent = window.TestingLibraryDom.fireEvent;
