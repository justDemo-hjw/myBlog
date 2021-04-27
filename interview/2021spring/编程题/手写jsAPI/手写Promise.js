/*
 * @Date: 2021-03-27 14:14:06
 * @LastEditors: hanjiawang
 * @LastEditTime: 2021-04-22 17:00:36
*/

function myPromise(fn) {
  this.cbs = []
  const resolve = (value) => {
    setTimeout(()=>{
      this.data = value
      this.cbs.forEach((item) => {
        item(this.data)
      })
    }, 0)
  }
  fn(resolve)
}

myPromise.prototype.then = function(onResolved) {
  return new myPromise((resolve) => {
    this.cbs.push(() => {
      const result = onResolved(this.data)
      if(result instanceof myPromise) {
        result.then(resolve)
      }else {
        resolve(result)
      }
    })
  })
}
function testPromise(fn) {
  this.cbs = []
  const resolve = (value) => {
    setTimeout(()=>{
      this.data = value
      this.cbs.forEach((cb) => {
        cb(this.data)
      })
    })
  }
  fn(resolve)
}

testPromise.prototype.then = function(onResolved) {
  return new testPromise((resolve) => {
    this.cbs.push(() => {
      const res = onResolved(this.data);
      if (res instanceof Promise) {
        res.then(resolve);
      } else {
        resolve(res);
      }
    })
  })
}