/*
 * @Date: 2020-10-27 14:04:34
 * @LastEditors: hanjiawang
 * @LastEditTime: 2020-10-27 14:45:55
*/
// 冒泡排序，时间复杂度O(n2)，最好时间复杂度O(n)
// 循环便利两个相邻元素，每次确定一个最大值，便利n次确定最终结果
function bubbleSort(arr) {
  const len = arr.length
  for(let i=0; i<len; i++) {
    for(let j=0; j<len-1; j++) {
      if(arr[j] > arr[j+1]) {
        [arr[j], arr[j+1]] = [arr[j+1], arr[j]]
      }
    }
  }
  return arr
}

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