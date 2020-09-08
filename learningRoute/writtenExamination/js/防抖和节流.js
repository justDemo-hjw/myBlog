/*
 * @Date: 2020-06-07 22:22:22
 * @LastEditors: hanjiawang
 * @LastEditTime: 2020-06-10 00:22:31
 */ 
//防抖节流原理和应用。防抖：事件执行之后打开一个定时器，定时器结束了才能开始下一次事件，在定时器范围内触发事件则定时器时间重制；主要应用在监听滚动事件、用户输入等；
//节流：在一段时间内只执行一次事件

function debounce(fn,wait) {
  let timeout;
  return function() {
    if(timeout) clearTimeout(timeout)
    setTimeout(() => {
      fn(this,arguments)
    }, wait);
  }
}
function test() {
  console.log('触发防抖')
}
window.addEventListener('scroll', debounce(test,1000))

function throttle(fn,wait) {
  let pre = new Date()
  return function() {
    let now = new Date()
    if((now - pre) > wait) {
      fn.call(this,arguments)
      pre = new Date()
    }
  }
}