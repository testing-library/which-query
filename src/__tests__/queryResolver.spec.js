import { getSuggestionFor } from "../queryResolver";
import { renderIntoDocument } from "./helpers/rendering";

test("should get the closest focusable element", () => {
  renderIntoDocument(`<a href="/foo"><span>the text</span></a>`);

  const span = document.querySelector("span");

  const suggestion = getSuggestionFor(span);

  expect(suggestion.toString()).toBe(
    "getByRole('link', { name: /the text/i })"
  );
});

test("should fallback to original element if no closest available", () => {
  renderIntoDocument(`<span>the text</span>`);

  const span = document.querySelector("span");
  const suggestion = getSuggestionFor(span);

  expect(suggestion.toString()).toBe("getByText('the text')");
});
