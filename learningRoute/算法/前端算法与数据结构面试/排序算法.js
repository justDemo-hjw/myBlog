/*
 * @Date: 2020-10-27 14:04:34
 * @LastEditors: hanjiawang
 * @LastEditTime: 2021-04-01 20:57:19
*/
// 冒泡排序，时间复杂度O(n2)，最好时间复杂度O(n)
// 循环遍历两个相邻元素，每次确定一个最大值，遍历n次确定最终结果
function butterBubbleSort(arr) {
  const len = arr.length
  for(let i=0; i<len; i++) {
    let flag = false
    for(let j=0; j<len-1-i; j++) {
      if(arr[j] > arr[j+1]) {
        [arr[j], arr[j+1]] = [arr[j+1], arr[j]]
        flag = true
      }
    }
    if(!flag) return arr
  }
  return arr
}

// 选择排序 时间复杂度O(n2)
// 遍历区间内最小元素，逐渐缩小范围n次后确定结果
function selectSort(arr) {
  const len = arr.length
  for(let i=0; i<len-1; i++) {
    let minIndex = i
    for(let j=j; j<len; j++) {
      if(arr[j] < arr[i]) {
        minIndex = arr[j]
      }
    }
    if(minIndex !== i) {
      [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]]
    }
  }
  return arr
}

// 插入排序 时间复杂度O(n2)
// 对比当前元素与前面序列的大小，放入属于它的位置
function insertSort(arr) {
  const len = arr.length
  let temp = null
  for(let i=1; i<len; i++) {
    let j = i
    temp = arr[i]
    while(j > 0 && arr[j-1] > temp) {
      arr[j] = arr[j-1]
      j--
    }
    arr[j] = temp
  }
  return arr
}

// 递归
// 归并算法，时间复杂度O(nlogn)，递归2分数组直到每个数组只有一个元素再将所有分割的有序列表合并
function mergeSort(arr) {
  const len = arr.length
  // 处理边界情况
  if(len <= 1) {
      return arr
  }   
  // 计算分割点
  const mid = Math.floor(len / 2)    
  // 递归分割左子数组，然后合并为有序数组
  const leftArr = mergeSort(arr.slice(0, mid)) 
  // 递归分割右子数组，然后合并为有序数组
  const rightArr = mergeSort(arr.slice(mid,len))  
  // 合并左右两个有序数组
  arr = mergeArr(leftArr, rightArr)  
  // 返回合并后的结果
  return arr
}
function mergeArr(arr1, arr2) {  
  // 初始化两个指针，分别指向 arr1 和 arr2
  let i = 0, j = 0   
  // 初始化结果数组
  const res = []    
  // 缓存arr1的长度
  const len1 = arr1.length  
  // 缓存arr2的长度
  const len2 = arr2.length  
  // 合并两个子数组
  while(i < len1 && j < len2) {
      if(arr1[i] < arr2[j]) {
          res.push(arr1[i])
          i++
      } else {
          res.push(arr2[j])
          j++
      }
  }
  // 若其中一个子数组首先被合并完全，则直接拼接另一个子数组的剩余部分
  if(i<len1) {
      return res.concat(arr1.slice(i))
  } else {
      return res.concat(arr2.slice(j))
  }
}
