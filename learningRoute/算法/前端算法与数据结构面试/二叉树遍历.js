/*
 * @Date: 2020-07-17 15:40:16
 * @LastEditors: hanjiawang
 * @LastEditTime: 2021-04-06 18:33:33
 */
const root = {
  val: "A",
  left: {
    val: "B",
    left: {
      val: "D"
    },
    right: {
      val: "E"
    }
  },
  right: {
    val: "C",
    right: {
      val: "F"
    }
  }
};
//先序，中序和后序修改tree.val的位置就好
function beforePoints(node) {
  if(!node) {
    return
  }
  console.log('当前遍历的结点值是：', node.val) 
  beforePoints(node.left)
  beforePoints(node.right)
}
// beforePoints(root)
// 使用迭代方法实现
//xian
function firstTest(root) {
  const stack = []
  const res = []
  stack.push(root)
  while(stack.length) {
    const point = stack.pop()
    res.push(point.val)
    point.right && stack.push(point.right)
    point.left && stack.push(point.left)
  }
  return res
}
console.log(firstTest(root))
// hou
function lastTest(root) {
  const stack = []
  const res = []
  stack.push(root)
  while(stack.length) {
    const point = stack.pop()
    res.unshift(point.val)
    point.right && stack.push(point.right)
    point.left && stack.push(point.left)
  }
  return res
}
console.log(lastTest(root))
// zhongxu
function centerTest(root) {
  const stack = []
  const res = []
  let cur = root
  while(cur || stack.length) {
    while(cur) {
      stack.push(cur.val)
      cur = cur.left
    }
    cur = stack.pop()
    res.push(cur.val)
    cur = cur.right
  }
  return res
}
// ceng
function levelTest(root) {
  if(!root) return
  const queue = []
  const res = []
  queue.push(root)
  while(queue.length) {
    const level = []
    const len = queue.length
    for(let i=0; i<len; i++) {
      const cur = queue.shift()
      level.push(cur.val)
      cur.left && queue.push(cur.left)
      cur.right && queue.push(cur.right)
    }
    res.push(level)
  }
  return res
}