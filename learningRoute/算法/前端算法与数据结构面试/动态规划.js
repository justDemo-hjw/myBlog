/*
 * @Date: 2020-11-02 14:39:28
 * @LastEditors: hanjiawang
 * @LastEditTime: 2020-11-02 15:11:44
*/
// 题目描述：假设你正在爬楼梯。需要 n 阶你才能到达楼顶。
// 每次你可以爬 1 或 2 个台阶。你有多少种不同的方法可以爬到楼顶呢？
// 注意：给定 n 是一个正整数。
// 示例 1：
// 输入： 2
// 输出： 2
// 解释： 有两种方法可以爬到楼顶。
// 1 阶 + 1 阶
// 2 阶
// 示例 2：
// 输入： 3
// 输出： 3
// 解释： 有三种方法可以爬到楼顶。
// 1 阶 + 1 阶 + 1 阶
// 1 阶 + 2 阶
// 2 阶 + 1 阶
// 状态转化方程 f(n) = f(n-1) + f(n-2)


// 1、递归（树的思想实现）
const climbStairs = function(n) {
  // 处理递归边界
  if(n === 1) {
      return 1
  }
  if(n === 2){
      return 2
  }
  // 递归计算
  return climbStairs(n-1) + climbStairs(n-2)
};
// 2、递归+记忆化搜索（第一种重复计算的过多）
// 定义记忆数组 f
const f = []
const climbStairs2 = function(n) {
  if(n==1) {
      return 1
  }
  if(n==2) {
      return 2
  }
  // 若f[n]不存在，则进行计算
  if(f[n]===undefined)  f[n] = climbStairs2(n-1) + climbStairs2(n-2)
  // 若f[n]已经求解过，直接返回
  return f[n]
};

// 3、动态规划思想，自底向上实现递归
const climbStairs = function(n) {
  // 初始化状态数组
  const f = [];
  // 初始化已知值
  f[1] = 1;
  f[2] = 2;
  // 动态更新每一层楼梯对应的结果
  for(let i = 3;i <= n;i++){
      f[i] = f[i-2] + f[i-1];
  }
  // 返回目标值
  return f[n];
};

// “最值”型问题典范：如何优雅地找硬币
// 题目描述：给定不同面额的硬币 coins 和一个总金额 amount。编写一个函数来计算可以凑成总金额所需的最少的硬币个数。如果没有任何一种硬币组合能组成总金额，返回 -1。
// 示例1：
// 输入: coins = [1, 2, 5], amount = 11
// 输出: 3
// 解释: 11 = 5 + 5 + 1
// 示例2：
// 输入: coins = [2], amount = 3
// 输出: -1
// 提示：最值问题是动态规划的常见对口题型，见到最值问题，应该想到动态规划
const coinChange = function(coins, amount) {
  // 用于保存每个目标总额对应的最小硬币个数
  const f = []
  // 提前定义已知情况
  f[0] = 0
  // 遍历 [1, amount] 这个区间的硬币总额
  for(let i=1;i<=amount;i++) {
      // 求的是最小值，因此我们预设为无穷大，确保它一定会被更小的数更新
      f[i] = Infinity
      // 循环遍历每个可用硬币的面额
      for(let j=0;j<coins.length;j++) {
          // 若硬币面额小于目标总额，则问题成立
          if(i-coins[j]>=0) {
              // 状态转移方程
              f[i] = Math.min(f[i],f[i-coins[j]]+1)
          }
      }
  }
  // 若目标总额对应的解为无穷大，则意味着没有一个符合条件的硬币总数来更新它，本题无解，返回-1
  if(f[amount]===Infinity) {
      return -1
  }
  // 若有解，直接返回解的内容
  return f[amount]
};