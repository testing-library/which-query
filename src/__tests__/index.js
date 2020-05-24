/**
 * @jest-environment jsdom
 */
import { screen } from "@testing-library/dom";
import { getSuggestedQuery } from "../";
import { renderIntoDocument } from "./helpers/test-utils";

test("should recommend role for element with text", () => {
  renderIntoDocument(`<button data-testid="foo">submit</button>`);

  const element = screen.getByTestId("foo"); //omg the hypocrisy
  expect(getSuggestedQuery({ element })).toBe(
    `ByRole("button", {name:/submit/})`
  );
});

test("should recommend role on element without text", () => {
  renderIntoDocument(`<input type="checkbox" />`);

  const element = screen.getByRole("checkbox");
  expect(getSuggestedQuery({ element })).toBe(`ByRole("checkbox")`);
});

test("should recommend role when none present", () => {
  const { container } = renderIntoDocument(`<span />`);

  const element = container.firstChild;
  expect(getSuggestedQuery({ element })).not.toBeDefined();
});

test.skip("should recommend semantic role on element with role attribute", () => {
  renderIntoDocument(`<a role="button">foo</a>`);

  screen.debug(screen.getByRole("link")); //🤔 maybe a gap in DTL here, but it appears that `link` is not returned when you use getByRole('link')
  const element = screen.getByText("foo");
  expect(getSuggestedQuery({ element })).toBe(`ByRole("link", {name:/foo/})`);
});

test.todo("should recommend text");
