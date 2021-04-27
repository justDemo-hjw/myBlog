/*
 * @Date: 2021-03-27 15:07:26
 * @LastEditors: hanjiawang
 * @LastEditTime: 2021-04-22 16:20:32
*/
JSON.parse(JSON.stringify())
// 无法拷贝循环引用对象，出现栈溢出
// 无法拷贝RegExp、Date、Set、Map等
// 无法拷贝函数
const isObject = (obj) => {
  return (typeof obj === 'object' || typeof obj === 'function') && typeof obj !== null 
}
const cloneDeep = (target, map = new WeakMap()) => {
  if(map.get(target)) {
    return target
  }
  if(isObject(target)) {
    map.set(target)
    const result = Array.isArray(target) ? [] : {}
    for(let prop in target) {
      if(target.hasOwnProperty(prop)) {
        result[prop] = cloneDeep(target[prop], map)
      }
    }
    return result
  }else {
    return target
  }
}



























