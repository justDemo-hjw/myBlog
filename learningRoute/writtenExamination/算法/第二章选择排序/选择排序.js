/*
 * @Date: 2020-06-05 22:57:34
 * @LastEditors: hanjiawang
 * @LastEditTime: 2020-06-14 22:24:40
 */ 
//将数组中数从大到小排列，选择排序，时间复杂度O(n2)
function selectionSort(arr) {
  for(let i=0; i<arr.length-1; i++){
    for(let item=i+1; item<arr.length; item++){
      if(arr[i]<arr[item]) [arr[i], arr[item]] = [arr[item], arr[i]]
    }
  }
  return arr
}

console.log(selectionSort([1,2,5,3,77,45,32,4,33]))