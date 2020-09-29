/*
 * @Date: 2020-09-22 15:47:33
 * @LastEditors: hanjiawang
 * @LastEditTime: 2020-09-22 15:51:53
 */
// 真题描述：给定一个链表，判断链表中是否有环。

// 示例 1：
// 输入：[3,2,0,4]（链表结构如下图） 输出：true
// 解释：链表中存在一个环

// 真题描述：给定一个链表，返回链表开始入环的第一个结点。 如果链表无环，则返回 null。

// 示例 1：
// 输入：head = [3,2,0,-4]（如下图） 输出：tail connects to node index 1 解释：链表中有一个环，其尾部连接到第二个结点。

const hasCircular = function (head) {
  let pointer = head
  while (pointer) {
    if (pointer.flag) {
      return pointer
    } else {
      pointer.flag = true
      pointer = pointer.next
    }
  }
  return null
}
