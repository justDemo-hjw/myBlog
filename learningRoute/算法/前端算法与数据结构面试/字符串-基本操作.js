/*
 * @Date: 2020-09-15 10:46:32
 * @LastEditors: hanjiawang
 * @LastEditTime: 2020-09-21 11:00:48
 */

// 反转字符串
let str = 'hello'
str = str.split('').reverse().join('')
console.log(str)

//判断字符串是不是回文字符串(正着读和反着读是一样的字符串)比如: ballab
// 1.反转字符判断是否相等
function isPalindrome(str) {
  let reversedStr = str.split('').reverse().join('')
  return reversedStr === str
}
// 2.对称判断相应位置字符是否相同
function isPalindrome(str) {
  const len = str.length
  for (let i = 0; i < len; i++) {
    if (str[i] !== str[len - i - 1]) {
      return false
    }
  }
  return true
}
// 3.指针判断
function isPalindrome(str) {
  const len = str.length
  let i = 0,
    j = len - 1
  while (i < j) {
    if (str[i] !== str[j]) {
      return false
    }
    i++
    j--
  }
  return true
}
// console.log(isPalindrome())
console.log(isPalindrome('oelleo'))
