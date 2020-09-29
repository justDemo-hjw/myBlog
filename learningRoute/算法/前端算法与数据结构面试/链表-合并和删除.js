/*
 * @Date: 2020-09-18 09:56:03
 * @LastEditors: hanjiawang
 * @LastEditTime: 2020-09-21 11:38:27
 */
// 1.链表的合并
// 真题描述：将两个有序链表合并为一个新的有序链表并返回。新链表是通过拼接给定的两个链表的所有结点组成的。
// 示例： 输入：1->2->4, 1->3->4 输出：1->1->2->3->4->4
const { ListNode } = require('./until')
let l1 = new ListNode(1)
l1.next = new ListNode(4)
l1.next.next = new ListNode(4)
l1.next.next.next = new ListNode(8)
let l2 = new ListNode(2)
l2.next = new ListNode(5)
l2.next.next = new ListNode(7)
l2.next.next.next = new ListNode(10)
l2.next.next.next.next = new ListNode(15)
let l3 = new ListNode(2)
const mergeTwoLists = function (l1, l2) {
  // 定义头结点，确保链表可以被访问到
  let head = new ListNode()
  // cur 这里就是咱们那根“针”
  let cur = head
  // “针”开始在 l1 和 l2 间穿梭了
  while (l1 && l2) {
    // 如果 l1 的结点值较小
    if (l1.val <= l2.val) {
      // 先串起 l1 的结点
      cur.next = l1
      // l1 指针向前一步
      l1 = l1.next
    } else {
      // l2 较小时，串起 l2 结点
      cur.next = l2
      // l2 向前一步
      l2 = l2.next
    }

    // “针”在串起一个结点后，也会往前一步
    cur = cur.next
  }

  // 处理链表不等长的情况
  cur.next = l1 !== null ? l1 : l2
  // 返回起始结点
  return head.next
}
console.log(mergeTwoLists(l1, l2))

//2.删除重复项
// 真题描述：给定一个排序链表，删除所有重复的元素，使得每个元素只出现一次。
// 示例 1:
// 输入: 1->1->2
// 输出: 1->2
// 示例 2:
// 输入: 1->1->2->3->3
// 输出: 1->2->3
const deleteDuplicates = function (head) {
  let cur = head
  while (!!cur && !!cur.next) {
    if (cur.val === cur.next.val) {
      cur.next = cur.next.next
    } else {
      cur = cur.next
    }
  }
  return head
}
console.log(deleteDuplicates(l1))

//3.删除重复项
// 真题描述：给定一个排序链表，删除所有含有重复数字的结点，只保留原始链表中 没有重复出现的数字。
// 示例 1:
// 输入: 1->2->3->3->4->4->5
// 输出: 1->2->5
// 示例 2:
// 输入: 1->1->1->2->3
// 输出: 2->3

const deleteDuplicatess = function (head) {
  // 极端情况：0个或1个结点，则不会重复，直接返回
  if (!head || !head.next) {
    return head
  }
  // dummy 登场
  let dummy = new ListNode()
  // dummy 永远指向头结点
  dummy.next = head
  // cur 从 dummy 开始遍历
  let cur = dummy
  // 当 cur 的后面有至少两个结点时
  while (cur.next && cur.next.next) {
    // 对 cur 后面的两个结点进行比较
    if (cur.next.val === cur.next.next.val) {
      // 若值重复，则记下这个值
      let val = cur.next.val
      // 反复地排查后面的元素是否存在多次重复该值的情况
      while (cur.next && cur.next.val === val) {
        // 若有，则删除
        cur.next = cur.next.next
      }
    } else {
      // 若不重复，则正常遍历
      cur = cur.next
    }
  }
  // 返回链表的起始结点
  return dummy.next
}
console.log(deleteDuplicatess(l3))
