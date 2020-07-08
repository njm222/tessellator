/*
* General utils for managing cookies in Typescript.
*/
export function setCookie (name: string, val: string) {
  const date = new Date()
  const value = val

  // Set it to expire in 30 minutes
  date.setTime(date.getTime() + (30 * 60 * 1000))

  // Set it
  document.cookie = `${name}=${value};expires=${date.toUTCString()};path=/`
}

export function getCookie (name: string) {
  const nameLenPlus = (name.length + 1)
  return document.cookie
    .split(';')
    .map(c => c.trim())
    .filter(cookie => {
      return cookie.substring(0, nameLenPlus) === `${name}=`
    })
    .map(cookie => {
      return decodeURIComponent(cookie.substring(nameLenPlus))
    })[0] || null
}

export function deleteCookie (name: string) {
  const date = new Date()

  // Set it expire in -1 days
  date.setTime(date.getTime() + (-1 * 24 * 60 * 60 * 1000))

  // Set it
  document.cookie = `${name}=;expires=${date.toUTCString()};path=/`
}
