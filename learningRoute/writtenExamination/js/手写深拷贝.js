/*
 * @Date: 2020-06-05 16:00:38
 * @LastEditors: hanjiawang
 * @LastEditTime: 2020-06-05 16:15:12
 */ 
function deepCopy(obj) {
  let result = obj instanceof Array ? [] : {}
  if(typeof obj=='object'&&obj!='null') {
    for(let i in obj) {
      result[i] = typeof obj[i]=='object'&&obj[i]!='null' ? deepCopy(obj[i]) : obj[i]
    }
  }else {
    result = obj
  }
  return result
}

let a = {a:1,b:2}
let b = deepCopy(a)