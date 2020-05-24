const {getRoles} = require('@testing-library/dom')

export function getSuggestedQuery({element}) {
  const roles = getRoles(element)

  let queryName
  const roleNames = Object.keys(roles)
  if (roleNames.length) {
    queryName = 'ByRole'
    const [queryParam] = roleNames
    let queryOptions = null
    if (element.textContent) {
      queryOptions = `, {name:/${element.textContent}/}`
    }

    return `${queryName}("${queryParam}"${queryOptions})`
  }

  return null
}
