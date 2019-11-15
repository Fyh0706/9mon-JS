//node 的模块化是 遵循 commonjs规范的
let qqq=require('./2.js')
console.log(qqq);
qqq.f();
// 每一个Js文件对于node来说都是一个大闭包
// require   __dirname  __filename   module.exports  exports
//以上5个都是属于当前js文件私有变量
/* 
 require 用来导入文件的
 __module.exports   exports 都是用来导出内容的
 __dirname 是当前文件所在文件夹的绝对路径
 __filename 是当前文件的绝对路径

*/
console.log('文件夹路径'+__dirname);
console.log('文件路径'+__filename);
//npm run  对于的脚本命令  (在package.json 的script中对应的属性名)
