/*
 * @Date: 2020-06-06 20:27:03
 * @LastEditors: hanjiawang
 * @LastEditTime: 2020-07-17 15:40:54
 */ 
function test(arr) {
  if(arr.length <= 1) {
    return arr
  }else {
    let left = []
    let right = []
    let flag = arr[0]
    arr.splice(0,1)
    arr.map(item=>{
      if(item > flag) {
        right.push(item)
      }else {
        left.push(item)
      }
    })
    return [...test(left), flag, ...test(right)]
  }
}
console.log(test([1,7,2,4,5,9,8]))