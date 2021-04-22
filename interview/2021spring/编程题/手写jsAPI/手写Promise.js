/*
 * @Date: 2021-03-27 14:14:06
 * @LastEditors: hanjiawang
 * @LastEditTime: 2021-04-16 17:21:14
*/












































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