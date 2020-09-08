/*
 * @Date: 2020-06-04 19:11:47
 * @LastEditors: hanjiawang
 * @LastEditTime: 2020-06-21 22:40:36
 */ 
//二分查找法，输入一个数组[1,...n]和一个目标数组a，返回数组中和a相同的索引; 时间复杂度O(logn)

function test(arr,a) {
  let left = 0
  let right = arr.length - 1
  let min
  while(left<=right) {
    min = Math.floor((left+right)/2)
    if(min<a) {
      left = min + 1
    }else {
      right = min - 1
    }
  }[]
  return min
}

console.log(test([1,2,3,4,5,6,7,8,9,10],7))



