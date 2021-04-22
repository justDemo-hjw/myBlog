/*
 * @Date: 2021-04-17 08:52:21
 * @LastEditors: hanjiawang
 * @LastEditTime: 2021-04-17 10:07:32
*/
// 3. 实现一个函数 find(obj, str)，满足:
// 如var obj = {a:{b:{c:1}}};
// find(obj,'a.b.c') //1
// find(obj,'a.d.c') //undefined
const find = function(obj, str) {
  let props = str.split('.')
  for(let i=0; i<props.length; i++) {
    if(obj[props[i]]) {
      obj = obj[props[i]]
    }else {
      return undefined
    }
  }
  return obj
}
console.log(find({a:{b:{c:1}}}, 'a.b.c'))