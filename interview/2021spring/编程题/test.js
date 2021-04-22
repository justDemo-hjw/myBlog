/*
 * @Date: 2021-04-01 20:38:42
 * @LastEditors: hanjiawang
 * @LastEditTime: 2021-04-05 10:23:00
*/
var a = {
  b: function() {
    console.log(1, this)
    setTimeout(function() {console.log(this)}, 1000)
  }
}
a.b()
