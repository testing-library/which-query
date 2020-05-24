/**
 * @jest-environment jsdom
 */
import { screen } from "@testing-library/dom";
import { getSuggestedQuery } from "../";
import { renderIntoDocument } from "./helpers/test-utils";

test("should recommend role on test id", () => {
  renderIntoDocument(`<button data-testid="foo">submit</button>`);

  const element = screen.getByTestId("foo"); //omg the hypocrisy
  expect(getSuggestedQuery({ element })).toBe(
    `ByRole("button", {name:/submit/})`
  );
});

test.todo("should recommend text");
