/*
 * @Date: 2020-07-25 15:24:29
 * @LastEditors: hanjiawang
 * @LastEditTime: 2020-07-25 15:40:38
 */
// /真题描述： 给定一个整数数组 nums 和一个目标值 target，请你在该数组中找出和为目标值的那 两个 整数，并返回他们的数组下标。
// 你可以假设每种输入只会对应一个答案。但是，你不能重复利用这个数组中同样的元素。

// 示例: 给定 nums = [2, 7, 11, 15], target = 9
// 因为 nums[0] + nums[1] = 2 + 7 = 9 所以返回 [0, 1]

// map解法
function addForMap(arr, target) {
  let myMap = new Map()
  for (let i = 0; i < arr.length; i++) {
    const num = target - arr[i]
    if (myMap.has(num)) {
      return [myMap.get(num), i]
    } else {
      myMap.set(arr[i], i)
    }
  }
  return false
}

console.log(addForMap([2, 7, 11, 15], 9))
