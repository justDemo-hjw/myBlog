/*
 * @Date: 2020-07-25 16:01:37
 * @LastEditors: hanjiawang
 * @LastEditTime: 2020-07-25 16:55:16
 */
// 真题描述：给你两个有序整数数组 nums1 和 nums2，请你将 nums2 合并到 nums1 中，使 nums1 成为一个有序数组。
// 说明: 初始化 nums1 和 nums2 的元素数量分别为 m 和 n 。 你可以假设 nums1 有足够的空间（空间大小大于或等于 m + n）来保存 nums2 中的元素。

// 示例: 输入:
// nums1 = [1,2,3,0,0,0], m = 3
// nums2 = [2,5,6], n = 3
// 输出: [1,2,2,3,5,6]

function test(arr1, m, arr2, n) {
  let pointer1 = m - 1,
    pointer2 = n - 1,
    index = m + n - 1
  while (pointer1 >= 0 && pointer2 >= 0) {
    if (arr1[pointer1] >= arr2[pointer2]) {
      arr1[index] = arr1[pointer1]
      index--
      pointer1--
    } else {
      arr1[index] = arr2[pointer2]
      index--
      pointer2--
    }
  }

  while (pointer2 >= 0) {
    arr1[index] = arr2[pointer2]
    index--
    pointer2--
  }
  return arr1
}

console.log(test([1, 2, 3, 0, 0, 0], 3, [2, 5, 6], 3))
