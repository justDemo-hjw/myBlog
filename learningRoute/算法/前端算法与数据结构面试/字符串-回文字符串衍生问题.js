/*
 * @Date: 2020-09-15 11:18:08
 * @LastEditors: hanjiawang
 * @LastEditTime: 2020-09-17 09:11:25
 */
// 给一个非空字符串，最多删除一个字符，判断是否能成为回文字符串
// 双指针
const validPalindrome = function (s) {
  // 缓存字符串的长度
  const len = s.length

  // i、j分别为左右指针
  let i = 0,
    j = len - 1

  // 当左右指针均满足对称时，一起向中间前进
  while (i < j && s[i] === s[j]) {
    i++
    j--
  }

  // 尝试判断跳过左指针元素后字符串是否回文
  if (isPalindrome(i + 1, j)) {
    return true
  }
  // 尝试判断跳过右指针元素后字符串是否回文
  if (isPalindrome(i, j - 1)) {
    return true
  }

  // 工具方法，用于判断字符串是否回文
  function isPalindrome(st, ed) {
    while (st < ed) {
      if (s[st] !== s[ed]) {
        return false
      }
      st++
      ed--
    }
    return true
  }

  // 默认返回 false
  return false
}
