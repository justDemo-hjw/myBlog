/*
 * @Date: 2020-10-24 11:11:20
 * @LastEditors: hanjiawang
 * @LastEditTime: 2020-10-26 10:50:29
*/
// 题目描述：给定一个二叉树，返回它的前序（先序）遍历序列。

// 示例: 输入: [1,null,2,3]

// 1   
//  \   
//   2   
//  /  
// 3 
// 输出: [1,2,3]
// 进阶: 递归算法很简单，你可以通过迭代算法完成吗？
function preorderTraversal(root) {
  const res = []
  const stack = []
  if(!root) {
    return res
  }
  stack.push(root)
  while(stack.length>0) {
    const node = stack.pop()
    res.push(node.val)
    if(node.right) {
      stack.push(node.right)
    }
    if(node.left) {
      stack.push(node.left)
    }
  }
  //后序遍历，将根结点放到结果数组头部，把入栈顺序翻过来
  // while(stack.length>0) {
  //   const node = stack.pop()
  //   res.unshift(node.val)
  //   if(node.left) {
  //     stack.push(node.left)
  //   } 
  //   if(node.right) {
  //     stack.push(node.right)
  //   }
  // }
  return res
}

// 中序遍历
const inorderTraversal = function(root) {
  // 定义结果数组
  const res = []  
  // 初始化栈结构
  const stack = []   
  // 用一个 cur 结点充当游标
  let cur = root  
  // 当 cur 不为空、或者 stack 不为空时，重复以下逻辑
  while(cur || stack.length) {
      // 这个 while 的作用是把寻找最左叶子结点的过程中，途径的所有结点都记录下来 
      while(cur) {
          // 将途径的结点入栈
          stack.push(cur)  
          // 继续搜索当前结点的左孩子
          cur = cur.left  
      }
      // 取出栈顶元素
      cur = stack.pop()  
      // 将栈顶元素入栈
      res.push(cur.val)  
      // 尝试读取 cur 结点的右孩子
      cur = cur.right
  }
  // 返回结果数组
  return res
};

// 题目描述：给你一个二叉树，请你返回其按 层序遍历 得到的节点值。 （即逐层地，从左到右访问所有节点）。

// 示例：

// 二叉树：[3,9,20,null,null,15,7],

//   3
//  / \
// 9  20
//   /  \
//  15   7
// 返回其层次遍历结果：

// [
// [3],
// [9,20],
// [15,7]
// ]
// 层序遍历
/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
const levelOrder = function(root) {
  // 初始化结果数组
  const res = []  
  // 处理边界条件
  if(!root) {
      return res
  }  
  // 初始化队列
  const queue = []   
  // 队列第一个元素是根结点
  queue.push(root)  
  // 当队列不为空时，反复执行以下逻辑
  while(queue.length) {
      // level 用来存储当前层的结点
      const level = []  
      // 缓存刚进入循环时的队列长度，这一步很关键，因为队列长度后面会发生改变
      const len = queue.length  
      // 循环遍历当前层级的结点
      for(let i=0;i<len;i++) {
          // 取出队列的头部元素
          const top = queue.shift()  
          // 将头部元素的值推入 level 数组
          level.push(top.val)
          // 如果当前结点有左孩子，则推入下一层级
          if(top.left) {
              queue.push(top.left)
          }
          // 如果当前结点有右孩子，则推入下一层级
          if(top.right) {
              queue.push(top.right)
          }
      }
      // 将 level 推入结果数组
      res.push(level)
  }
  // 返回结果数组
  return res
};

// 题目描述：翻转一棵二叉树。

// 示例：

// 输入：

//      4
//    /   \
//   2     7
//  / \   / \
// 1   3 6   9
// 输出：

//      4
//    /   \
//   7     2
//  / \   / \
// 9   6 3   1
/**
 * @param {TreeNode} root
 * @return {TreeNode}
 */
const invertTree = function(root) {
  // 定义递归边界
  if(!root) {
      return root;
  }
  // 递归交换右孩子的子结点
  let right = invertTree(root.right);
  // 递归交换左孩子的子结点
  let left = invertTree(root.left);
  // 交换当前遍历到的两个左右孩子结点
  root.left = right;
  root.right = left;
  return root;
};