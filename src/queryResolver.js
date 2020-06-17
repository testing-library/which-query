import { getSuggestedQuery } from "@testing-library/dom";
const CLOSEST_SELECTOR = [
  "input:not([disabled])",
  "button:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  "a[href]",
  "[tabindex]:not([disabled])",
  "[role]",
].join(", ");

export function getSuggestionFor(element, variant) {
  const elementToResolve = element.closest(CLOSEST_SELECTOR) || element;
  return getSuggestedQuery(elementToResolve, variant);
}
