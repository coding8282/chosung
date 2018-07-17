/**
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Storage/LocalStorage}
 */
export default {
  get (key) {
    return JSON.parse(localStorage.getItem(key))
  },
  set (key, val) {
    localStorage.setItem(key, JSON.stringify(val))
  },
  remove (key) {
    localStorage.removeItem(key)
  },
  clear () {
    localStorage.clear()
  }
}
