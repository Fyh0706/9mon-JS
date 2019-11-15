    let http = require('http'),
        url = require('url'),
        {
            readFile
        } = require('./promiseFs');
    let server = http.createServer((req, res) => {
        //cors跨域
        // console.log(req);
        //res.headers请求头
        //cors跨域
        // res.setHeader('Access-Control-Allow-Origin', 'https://www.baidu.com'); //支持跨域
        // res.setHeader('Access-Control-Allow-Methods','POST');
        // res.setHeader('set-cookie','qqq=6666');//跨域种植cookie 在application中没有体现
        let str = '';
        req.on('data', function (chunk) {
            //正在接收请求体
            str += chunk;
        })
        req.on('end',()=>{
            //接受请求体完成
                console.log(str);
                
        })
        res.writeHead(200, {
            'Access-Control-Allow-Origin': '*'
        })
        res.end('999')
    });
    let port = 8000;
    let init = true;

    function listen() {
        let cb = null;
        if (init) {
            cb = () => {
                console.log('服务起于 ' + port);
            }
            init = false;
        }
        server.listen(port, cb);
    }
    listen();
    server.on('error', (e) => {
        if (e.code === 'EADDRINUSE') {
            //上个端口被占用
            port++;
            listen();
        }

    })


    /* 
     http 怎么起服务？
          怎么获取前端数据 (路径 和参数)
          怎么去设置响应头(cors跨域的设置)
          端口占用的处理
          后端的响应  res.end(给前端的信息)
    
    */