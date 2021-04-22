/*
 * @Date: 2021-04-19 10:46:18
 * @LastEditors: hanjiawang
 * @LastEditTime: 2021-04-19 11:16:44
*/
// 去除首尾括号
let str = "   dsa  das     "
str = str.replace(/^\s*|\s*$/g, "")
console.log(str)
document.documentElement.style.fontSize = document.documentElement.clientWidth / 375 + 'px'