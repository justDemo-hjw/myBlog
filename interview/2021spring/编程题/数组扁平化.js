/*
 * @Date: 2021-03-15 20:39:53
 * @LastEditors: hanjiawang
 * @LastEditTime: 2021-03-15 20:46:52
*/
// 递归 
function test(arr) {
  let result = []
  for(let i=0; i<arr.length; i++) {
    if(Array.isArray(arr[i])) {
      result = result.concat(test(arr[i]))
    }else {
      result.push(arr[i])
    }
  }
  return result
}
// ES6 flat 只会拉平一层所以要传个infinity
function test1(arr) {
  return arr.flat(Infinity)
}