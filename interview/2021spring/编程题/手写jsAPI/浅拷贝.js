/*
 * @Date: 2021-03-27 15:52:04
 * @LastEditors: hanjiawang
 * @LastEditTime: 2021-03-28 11:12:51
*/
// 只拷贝一层
// 1. arr.slice()
// 2. ...运算符
// 3. concat连接数组
// 4. 手动实现，不递归调用，直接fuzhi
const isObject = (obj) => {
  return (typeof obj === 'object' || typeof obj === 'function') && typeof obj !== null
}
function cloneTest(obj){
  if(isObject(obj)) {
    const result = Array.isArray(obj) ? [] : {}
    for(let prop in obj) {
      result[prop] = obj[prop]
    }
    return result
  }else {
    return obj
  }
}