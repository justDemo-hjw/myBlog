/*
 * @Date: 2021-04-17 08:51:50
 * @LastEditors: hanjiawang
 * @LastEditTime: 2021-04-17 09:47:28
*/
// leetCode 415
// 给定两个字符串形式的非负整数 num1 和num2 ，计算它们的和。
// num1 和num2 的长度都小于 5100
// num1 和num2 都只包含数字 0-9
// num1 和num2 都不包含任何前导零
// 你不能使用任何內建 BigInteger 库， 也不能直接将输入的字符串转换为整数形式
const addStrings = function(num1, num2) {
  const result = []
  let i = num1.length - 1
  let j = num2.length - 1
  let addNum = 0
  while(i>=0 || j>=0 || addNum>0) {
    const a = +num1[i] || 0
    const b = +num2[j] || 0
    result.unshift((a+b+addNum) % 10)
    addNum = Math.floor((a+b+addNum)/10)
    i--
    j--
  }
  return result.join('')
}