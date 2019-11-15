let path=require('path');
//可以生成绝对路径
console.log(path.resolve('./es6'));
console.log(path.resolve(__dirname,'./qqq'));
//url.parse 后台一般用来获取url上的参数
let url=require('url');
let str='https://baidu.con?a=12&b=13&c=24#qqq'
console.log(url.parse(str,true).query.a);


