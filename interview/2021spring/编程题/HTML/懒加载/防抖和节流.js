/*
 * @Date: 2021-04-06 10:37:11
 * @LastEditors: hanjiawang
 * @LastEditTime: 2021-04-06 11:38:48
*/
function debounce(fn, delay) {
  let timer = null
  return function() {
    if(timer) {
      clearTimeout(timer)
    }
    let content = this
    let args = arguments
    timer = setTimeout(() => {
      fn.apply(content, args)
    }, delay)
  }
}

function throttle(fn, delay) {
  let last = 0
  return function() {
    const now = +new Date()
    if(now - last >= delay) {
      last = now
      fn.apply(this, arguments)
    }
  }
}

// 防抖每次都等定时器结束才执行，如果用户一直操作频繁也会让用户感到卡顿，所以用节流优化防抖，在一定时间内如果一直频繁触发也要给用户一次反馈
function throttle2(fn, delay) {
  let last = 0
  let timer = null
  return function() {
    let context = this
    let args = arguments
    let now = +new Date()
    if(now - last < delay) {
      if(timer) {
        clearTimeout(timer)
      }
      tiemr = setTimeout(()=> {
        fn.apply(context, args)
      }, delay)
    }else {
      last = now
      fn.apply(context, args)
    }
  }
}