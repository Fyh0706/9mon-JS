 let http = require('http');
 let url = require('url');
 let {
     readFile,writeFile
 } = require('./promiseFs');
 let server = http.createServer((req, res) => {
     let {
         pathname,
         query
     } = url.parse(req.url, true);
     let method = req.method;
     res.setHeader('Access-Control-Allow-Origin', "http://localhost:3000"); // 让后端支持跨域
     //跨域设置cookie   跨域源域不能是*号  响应头需要有  'Access-Control-Allow-Credentials': true,           credentials属性  前端允许跨域携带cookie
     res.writeHead(200, {
         'Access-Control-Allow-Credentials': true,
         'set-cookie':'qwer=123456789'
     })
     //list get  
     //add post
     switch (pathname) {
         case '/list':
             if (method.toLowerCase() !== 'get') {
                 res.statusCode = 405;
                 res.statusMessage = 'METHOD NOT ALLOWED';
                 res.end('');
             } else {
                 readFile('./json/data.json').then(data => {
                     res.end(data)
                 }).catch(err => {
                     res.statusCode = 500;
                     res.end('')
                 })
             }
             break;
         case '/add':
             if (method.toLowerCase() !== 'post') {
                 res.statusCode = 405;
                 res.statusMessage = 'METHOD NOT ALLOWED';
                 res.end('');
             } else {
                 //获取前端给的请求体
                 let str = ''
                 req.on('data', function (chunk) {
                     str += chunk;
                 });
                 req.on('end', function () {
                     readFile('./json/data.json').then(data=>{
                           console.log('data',data);
                           let obj=JSON.parse(data);
                           obj.data.push(...JSON.parse(str).a);//obj是增加完数据之后的对象
                         return  writeFile('./json/data.json',JSON.stringify(obj))
                           
                     }).then(data=>{
                         res.end(JSON.stringify({code:0,data:'success'}))
                     }).catch(err=>{
                         res.statusCode=500;
                         res.statusMessage='BAD SYSTERM';
                         res.end('');
                         
                     })
                    //  console.log(str);
                    //  res.end('6666');
                 })
             }
             break;
         default:
             break;
     }
 })
 let port = 8000;

 function listen() {
     let cb = null;
     if (port === 8000) {
         cb = () => {
             console.log(`服务起于${port}  端口`);
         }
     }
     server.listen(port, cb)
 }

 server.on('error', function (e) {
     if (e.code === 'EADDRINUSE') {
         port++;
         listen();
     }
 })
 listen();