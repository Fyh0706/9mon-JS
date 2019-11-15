//fs  读写文件
// url.parse 获取url参数
//path.resolve 获取绝对路径
//http  是起服务的模块


//__dirnamee    __filename
let http = require('http');
let url=require('url');
let {
    readFile
} = require('./promiseFs');
http.createServer((req, res) => {
    //req 存放的是请求信息  
    //res 存放的响应信息
    //只要前端发送了请求，就会执行该函数
    // console.log(req.url);//前端的请求路径
    //console.log(req.method)//前端的请求方法
    // console.log(req.method);
    console.log(url.parse(req.url,true));//解析前端路径
    //pathname 是前端给的纯路径 
    //query 是前端在路径上给的参数
    let {pathname,query}=url.parse(req.url,true)
    if (pathname == '/favicon.ico') {
      
         readFile('./1.jpg').then(data=>{
             console.log(data);
             res.end(data)         
         }).catch(()=>{
             //读取失败
             res.statusCode=404;//给前端的状态码
             res.statusMessage='hello hahh'//给前端的状态文本
         })
    } else {
        res.end(JSON.stringify(query)) //给前端响应
    }
 
    // res.end('888')
}).listen(8000, () => {
    //服务启动之后会执行该函数
    console.log('服务启动成功 端口是8000');

})