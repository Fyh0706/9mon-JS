//  编写一个正则  可以 匹配  有效数字
// 可以有 + -号； 可以有小数       整数部分不能以0开头
//只要有.后面肯定有小数至少有一次
//整数部分 多位数时 首位不能是 0  
var reg = /^[(0.||+-\d)]\d{n,}$/;
var reg = /^[+-]?(([1-9]\d+)|\d)(\.\d+)?$/
// console.log(reg.test('0123'));
// console.log(reg.test('10123'));
// console.log(reg.test('-10123'));
// console.log(reg.test('+123'));
// console.log(reg.test('+123.12'));
// console.log(reg.test('+123.12.12'));
// console.log(reg.test('+123.12.12'));
// console.log(reg.test('+0.12'));
console.log(reg.test('+0.0'));
// console.log(reg.test('1'));
// console.log(reg.test('2'));


// 匹配手机号

//必须为11位 必须是1开头
var reg = /^1[3-9]\d{9}/;
//至少5位不能以0开头；@qq.com

var reg = /^[1-9]\d{4,10}@qq\.com$/i;
var reg = /^[a-zA-Z]\w{5,17}$/;
//8-18 既有大又有小写 还得有数字

var str = '';

var reg = /^..$/
new RegExp()
// 4 ==============   密码  8-18； 既有大写 又有小写； 还得有数字
function judge(str) {
    if (str.length > 18 || str.length < 8) return fasle
    if (!/[A-Z]/.test(str)) return false
    if (!/[a-z]/.test(str)) return false
    if (!/\d/.test(str)) return false
    return true

    // if(str.length>=8 && str.length<=18 &&/[A-Z]/.test(str)&&/[a-z]/.test(str)&&/\d/.test(str) ){
    //     return true
    // }
    // return false
}


var reg = /^(1[89]|[2-5]\d|6[0-5]$)/