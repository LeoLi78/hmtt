/**
 * 获取
 * @param {*} key
 * @returns
 */
export function getItem (key) {
  const res = window.localStorage.getItem(key)
  try {
    return JSON.parse(res)
  } catch {
    return res
  }
}
/**
 * 设置
 * @param {*} key
 * @param {*} value
 */
export function setItem (key, value) {
  if (typeof value === 'object') {
    window.localStorage.setItem(key, JSON.stringify(value))
  } else {
    window.localStorage.setItem(key, value)
  }
}
/**
 * 根据key删除一个
 * @param {} key
 */
export function removeItem (key) {
  window.localStorage.removeItem(key)
}
/**
 * 删除所有本地缓存
 */
export function clearItem () {
  window.localStorage.clearItem()
}
