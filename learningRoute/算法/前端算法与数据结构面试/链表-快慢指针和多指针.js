/*
 * @Date: 2020-09-21 11:34:26
 * @LastEditors: hanjiawang
 * @LastEditTime: 2020-09-21 14:34:56
 */
// 真题描述：给定一个链表，删除链表的倒数第 n 个结点，并且返回链表的头结点。

// 示例： 给定一个链表: 1->2->3->4->5, 和 n = 2.
// 当删除了倒数第二个结点后，链表变为 1->2->3->5.
// 说明： 给定的 n 保证是有效的。
const { ListNode } = require('./until')
let l1 = new ListNode(1)
l1.next = new ListNode(4)
l1.next.next = new ListNode(4)
l1.next.next.next = new ListNode(8)
const removeNthFromEnd = function (head, n) {
  const dummy = new ListNode()
  dummy.next = head
  let slow = dummy
  let fast = dummy
  while (n !== 0) {
    fast = fast.next
    n--
  }
  while (!!fast.next) {
    slow = slow.next
    fast = fast.next
  }
  slow.next = slow.next.next
  return dummy.next
}
console.log(removeNthFromEnd(l1, 4))

// 真题描述：定义一个函数，输入一个链表的头结点，反转该链表并输出反转后链表的头结点。

// 示例:
// 输入: 1->2->3->4->5->NULL
// 输出: 5->4->3->2->1->NULL

const reverseList = function (head) {
  // 初始化前驱结点为 null
  let pre = null
  // 初始化目标结点为头结点
  let cur = head
  // 只要目标结点不为 null，遍历就得继续
  while (cur !== null) {
    // 记录一下 next 结点
    let next = cur.next
    // 反转指针
    cur.next = pre
    // pre 往前走一步
    pre = cur
    // cur往前走一步
    cur = next
  }
  // 反转结束后，pre 就会变成新链表的头结点
  return pre
}

// 真题描述：反转从位置 m 到 n 的链表。请使用一趟扫描完成反转。
// 说明: 1 ≤ m ≤ n ≤ 链表长度。
// 示例:
// 输入: 1->2->3->4->5->NULL, m = 2, n = 4
// 输出: 1->4->3->2->5->NULL
const reverseBetween = function (head, m, n) {
  // 定义pre、cur，用leftHead来承接整个区间的前驱结点
  let pre, cur, leftHead
  // 别忘了用 dummy 嗷
  const dummy = new ListNode()
  // dummy后继结点是头结点
  dummy.next = head
  // p是一个游标，用于遍历，最初指向 dummy
  let p = dummy
  // p往前走 m-1 步，走到整个区间的前驱结点处
  for (let i = 0; i < m - 1; i++) {
    p = p.next
  }
  // 缓存这个前驱结点到 leftHead 里
  leftHead = p
  // start 是反转区间的第一个结点
  let start = leftHead.next
  // pre 指向start
  pre = start
  // cur 指向 start 的下一个结点
  cur = pre.next
  // 开始重复反转动作
  for (let i = m; i < n; i++) {
    let next = cur.next
    cur.next = pre
    pre = cur
    cur = next
  }
  //  leftHead 的后继结点此时为反转后的区间的第一个结点
  leftHead.next = pre
  // 将区间内反转后的最后一个结点 next 指向 cur
  start.next = cur
  // dummy.next 永远指向链表头结点
  return dummy.next
}
