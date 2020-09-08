/*
 * @Date: 2020-07-17 15:40:16
 * @LastEditors: hanjiawang
 * @LastEditTime: 2020-07-25 15:21:51
 */
let root = {
  val: 'A',
  left: {
    val: 'B',
    left: {
      val: 'D',
      left: null,
      right: null,
    },
    right: {
      val: 'E',
      left: null,
      right: null,
    },
  },
  right: {
    val: 'C',
    left: null,
    right: {
      val: 'F',
      left: null,
      right: null,
    },
  },
}
//先序，中序和后序修改tree.val的位置就好
// function beforePoints(tree) {
//   if(!tree) {
//     return ''
//   }else {
//     return tree.val + beforePoints(tree.left) + beforePoints(tree.right)
//   }
// }
beforePoints()
