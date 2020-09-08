/*
 * @Date: 2020-06-06 20:31:25
 * @LastEditors: hanjiawang
 * @LastEditTime: 2020-06-06 21:29:23
 */ 
//实现一个深拷贝
function deeplyCopy(obj) {
  let result = obj instanceof Array ? [] : {}
  if(typeof obj=='object'&&obj!='null') {
    for(let i in obj) {
      result[i] = typeof obj[i]=='object'&&obj[i]!='null' ? deeplyCopy(obj[i]) : obj[i]
    }
  }else {
    return obj
  }
  return result
}

let a = {a:1,c:{b:1}}
let b =deeplyCopy(a)
a.c.b = 2
console.log(b)