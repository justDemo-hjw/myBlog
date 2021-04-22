/*
 * @Date: 2021-03-22 08:25:28
 * @LastEditors: hanjiawang
 * @LastEditTime: 2021-03-22 11:59:25
*/
// 冒泡排序 循环遍历数组两两比较，把较大值放在后面每次遍历可找出一个最大值，缩小范围重复n次；最坏/平均时间复杂度O(n2)最好复杂度O(n)空间复杂度O(1)
function bubbleSort(arr) {
  const len = arr.length
  for(let i=0; i<len; i++) {
    let flag = false
    for(let j=0; j<len-1-i; j++) {
      if(arr[j+1] < arr[j]){
        [arr[j], arr[j+1]] = [arr[j+1], arr[j]]
        flag = true
      }
    }
    if(!flag) {
      return arr
    }
  }
  return arr
}
// 插入排序 从下标为1的数开始遍历，目标数和前面的数对比，若小于则把前面的数依次后移并将目标数插入 重复直到遍历完最后一个数字；时间复杂度O(n2) 空间复杂度O(1)
function insertSort(nums) {
  const len = nums.length
  for(let i=0; i<len-1; i++) {
    let j = i + 1
    let temp = nums[j]
    while(j>0 && nums[j-1] > temp) {
      nums[j] = nums[j-1]
      j--
    }
    nums[j] = temp
  }
  return nums
}
// 选择排序 循环遍历数组，每次找到数组最小值放在头部重复n次；时间复杂度O(n2) 最坏/平均时间复杂度O(n2)空间复杂度O(1)
function selectSort(nums) {
  const len = nums.length
  let minIndex = 0 
  for(let i=0; i<len; i++) {
    for(let j=i+1; j<len; j++) {
      if(nums[j] < nums[minIndex]) {
        minIndex = j
      }
    }
    if(minIndex !== i) {
      [nums[i], nums[minIndex]] = [nums[minIndex], nums[i]]
    }
  }
  return nums
}
// 快速排序 找到一个基准值，保证数组左面不大于基准值，数组右面不小于基准值，对左右数组重复这个过程直到整个数组有序 平均时间复杂度O(nlogn) 最好O(logn) 最坏O(n2) 空间复杂度O(logn)
function quickSort(arr, left = 0, right = arr.length - 1) {
  if(arr.length > 1) {
      const lineIndex = partition(arr, left, right)
      if(left < lineIndex-1) {
        quickSort(arr, left, lineIndex-1)
      }
      if(lineIndex<right) {
        quickSort(arr, lineIndex, right)
      }
  }
  return arr
}
function partition(arr, left, right) {
  let pivotValue = arr[Math.floor(left + (right-left)/2)]
  let i = left
  let j = right
  while(i<=j) {
      while(arr[i] < pivotValue) {
          i++
      }
      while(arr[j] > pivotValue) {
          j--
      }
      if(i<=j) {
          swap(arr, i, j)
          i++
          j--
      }
  }
  return i
}
function swap(arr, i, j) {
  [arr[i], arr[j]] = [arr[j], arr[i]]
}
// 归并排序 将数组从中间一分为二，重复此过程直到不可再分，然后将数组两按顺序两融合 最坏/平均O(nlogn) 最好O(logn) 空间复杂度O(n2)
function mergeSort(nums) {
  if(nums.length <= 1) {
    return nums
  }
  const middle = Math.floor(nums.length/2)
  const left = mergeSort(nums.slice(0, middle))
  const right = mergeSort(nums.slice(middle))
  return mergeArr(left, right)
}
function mergeArr(left, right) {
  let i=0;
  let j=0;
  const result = []
  while(i<left.length && j<right.length) {
    if(left[i] < right[j]) {
      result.push(left[i])
      i++
    }else {
      result.push(right[j])
      j++
    }
  }
  if(i<left.length) {
    return result.concat(left.slice(i))
  }
  if(j<right.length) {
    return result.concat(right.slice(j))
  }
  return result
}