//fs 是node内置模块 用来操作文件的
//  I/O    input  output  IO操作 文件的读写
let fs = require('fs');
//readFile 三个参数  url  编码格式  回调函数 
// utf-8
/* fs.readFile('./package.json','utf-8',(err,data)=>{
     //err 若读取文件失败  则 err就会有对应的值 
     //若成功则 err为null
     if(!err){
          console.log('data',data);
     }else{
          console.log('err',err);
     }
    
   
     
     
}); */
//同步读取
/* let data = fs.readFileSync('./1.less', 'utf-8');
console.log(data); */
//readFile 异步  readFileSync 同步

//读文件夹
/* fs.readdir('./node', null, (err, data) => {
     !err ? 
     data.forEach(item => {
          fs.readFile('./node/'+ item, 'utf-8', (e, d) => {
               !e ? console.log(d) : console.log(e);
          })

     }) 
     :
      console.log('err', err);


}) */

/* let res=fs.readdirSync('./node');
console.log(res); */
/* fs.mkdir('qqq',(err)=>{
 !err ?console.log('创建成功'):console.log('创建失败');
   fs.mkdirSync('./qqq')   
}) */

/* fs.rmdir('./qqq',(err)=>{
     //若文件夹中有有文件 则就删除失败
     //根本不存在对应的文件夹 也会删除失败
     err?console.log('删除失败'):console.log('删除成功');
       
})
fs.rmdirSync('./qqq') */
/* fs.mkdir('./qqq',(err)=>{
     !err ?console.log('创建成功'):console.log('创建失败');
})
fs.writeFile('./qqq/1.txt','你好中国','utf-8',(err)=>{
     !err ?console.log('写入成功'):console.log('写入失败');
}) */
/* fs.writeFileSync('./aaa/1.txt','你好 王车干','utf-8')
console.log(666); */
/* fs.appendFile('./qqq/1.txt','你好 蝈蝈','utf-8',(err)=>{
     !err ?console.log('添加成功'):console.log('添加失败');
}) */
function append(url, data) {
     fs.readFile(url, 'utf-8', (err, d) => {
          // if (!err) {
          //      fs.writeFile(url, d + data, 'utf-8', (err) => {
          //           !err ? console.log('添加成功') : console.log('添加失败');
          //      })
          // }else{
          //      fs.writeFile(url,data, 'utf-8', (err) => {
          //           !err ? console.log('创建成功') : console.log('添加失败');
          //      })

          // }
          if (d === undefined) {
               d = '';
          }
          fs.writeFile(url, data, 'utf-8', (err) => {
               !err ? console.log('创建成功') : console.log('添加失败');
          })

     })
}
/* append('./qqq/2.txt', '哈哈哈') */
// fs.rmdir('./qqq',(err)=>{
//      console.log(err);
     
// })
// fs.unlink('./qqq/2.txt',(err)=>{
//      console.log(err);
     
// })
fs.copyFile('./qqq/1.txt','./qqq/2.txt',(err)=>{
     console.log(err);
     
})
//readFile readdir   mkdir  rmdir
// writeFile  appendFile copyFile unlink