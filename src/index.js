const { getRoles } = require("@testing-library/dom");

// eslint-disable-next-line consistent-return
export function getSuggestedQuery({ element }) {

    const roles = getRoles(element);

    let queryName;
    const roleNames = Object.keys(roles);

    if (roleNames.length) {
        let parameters = [];
        queryName = "Role";
        const [role] = roleNames;

        parameters.push(JSON.stringify(role));
        let queryOptions = "";
        if (element.textContent) {
            parameters.push(`{name:/${element.textContent}/}`)
        }


        return {
            queryName, parameters, toString() {
                return `${queryName}(${parameters.join(", ")})`;
            }
        };
    }
}
