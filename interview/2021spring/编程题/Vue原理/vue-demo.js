/*
 * @Date: 2021-04-09 11:11:58
 * @LastEditors: hanjiawang
 * @LastEditTime: 2021-04-09 11:58:30
*/
// 响应式实现
/**
 * observer用于遍历data属性调用defineReactive
 * defineReactive劫持对象get set方法
 * 
 */
class Dep {
  // 订阅者Dep收集观察者Watcher
  constructor() {
    this.subs = []
  }
  addSub(sub) {
    this.subs.push(sub)
  }
  notify() {
    this.subs.forEach(sub => {
      console.log('notify', sub)
      sub.update()
    })
  }
}

class Watcher {
  // 观察者Watcher
  constructor() {
    Dep.target = this
    console.log(this)
  }
  update() {
    console.log('视图更新了')
  }
}
Dep.target = null

function defineReactive(obj, key, val) {
  const dep = new Dep()
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function() {
      dep.addSub(Dep.target)
      return val
    },
    set: function(newValue) {
      if(newValue === val) return
      val = newValue
      dep.notify()
    }
  })
}

function observer(data) {
  if(!data || typeof data !== 'object') {
    return
  }
  for(let i in data) {
    defineReactive(data, i, data[i])
  }
}

class Vue {
  constructor(options) {
    this._data = options.data
    observer(this._data)
    new Watcher()
    console.log('render', this._data.test)
  }
}

let demo = new Vue({
  data: {
    test: '111'
  }
})

demo._data.test = 222