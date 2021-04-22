/*
 * @Date: 2021-04-01 16:40:50
 * @LastEditors: hanjiawang
 * @LastEditTime: 2021-04-01 16:46:48
*/
function test(fn, ...args) {
  const obj = {}
  Object.setPrototypeOf(obj, fn.prototype)
  const result = fn.apply(obj, args)
  return result instanceof Object ? result : obj
}