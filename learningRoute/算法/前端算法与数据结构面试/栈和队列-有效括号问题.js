/*
 * @Date: 2020-09-22 16:43:11
 * @LastEditors: hanjiawang
 * @LastEditTime: 2020-09-22 17:13:32
 */
// 题目描述：给定一个只包括 '('，')'，'{'，'}'，'['，']' 的字符串，判断字符串是否有效。

// 有效字符串需满足： 左括号必须用相同类型的右括号闭合。
// 左括号必须以正确的顺序闭合。
// 注意空字符串可被认为是有效字符串。
// 示例 1:
// 输入: "()"
// 输出: true

// 示例 2:
// 输入: "()[]{}"
// 输出: true

// 示例 3:
// 输入: "(]"
// 输出: false

// 示例 4:
// 输入: "([)]"
// 输出: false
// 示例 5:
// 输入: "{[]}"
// 输出: true

const leftToRight = {
  '{': '}',
  '[': ']',
  '(': ')',
}

const isValid = function (str) {
  let stack = []
  const len = str.length
  for (let i = 0; i < len; i++) {
    const pointer = str[i]
    if (pointer === '{' || pointer === '[' || pointer === '(') {
      stack.push(leftToRight[pointer])
    } else {
      if (str.length > 0 && pointer !== stack.pop()) {
        return false
      }
    }
  }
  return !str.length
}
