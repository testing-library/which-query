const { getRoles } = require("@testing-library/dom");

// eslint-disable-next-line consistent-return
export function getSuggestedQuery({ element }) {
  const roles = getRoles(element);

  let queryName;
  const roleNames = Object.keys(roles);

  if (roleNames.length) {
    queryName = "ByRole";
    const [queryParam] = roleNames;

    let queryOptions = "";
    if (element.textContent) {
      queryOptions = `, {name:/${element.textContent}/}`;
    }

    return `${queryName}("${queryParam}"${queryOptions})`;
  }
}
