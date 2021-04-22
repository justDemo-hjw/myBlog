/*
 * @Date: 2021-04-05 10:31:00
 * @LastEditors: hanjiawang
 * @LastEditTime: 2021-04-16 17:07:13
*/
Function.prototype.myCall = function(content, ...args) {
  content = content || window
  content.fn = this
  const result = content.fn(...args)
  delete content.fn
  return result
}

Function.prototype.myApply = function(content, args) {
  content = content || window
  content.fn = this
  const result = content.fn(args)
  delete content.fn
  return result
}












































Function.prototype.myCall = function(context, ...arg) {
  context = context || window
  context.fn = this
  const result = context.fn(...arg)
  delete context.fn
  return result
}

Function.prototype.myApply = function(context, arg) {
  context = context || window
  context.fn = this
  const result = context.fn(...arg)
  delete context.fn
  return result
}

Function.prototype.myBind = function(context, ...arg) {
  if(typeof context!== 'function') {
    throw new Error('false')
  }
  const selfFn = this
  const resultFn = function() {
    selfFn.apply(this instanceof selfFn ? this : context, arg.concat(Array.prototype.call(arguments)))
  }
  resultFn.prototype = Object.create(this.prototype)
  return resultFn
}

function test(...aa) {
  this.a = 1
  console.log(...aa)
}
const obj = {}
test.myApply(obj,[1,2,3,4,5])
console.log(obj)