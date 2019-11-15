let http = require('http');
let url = require('url');
let {
    readFile
} = require('./promiseFs');
http.createServer((req, res) => {
    let {
        pathname,
        query
    } = url.parse(req.url, true);
    if (pathname === '/') {
        readFile('./static/index.html').then(data => {
            res.end(data);
        }).catch(err => {
            res.statusCode = 500;
            readFile('./static/500.html').then(data => {
                res.end(data);
            })
        })
    } else {
        if (/\./.test(pathname)) { //有后缀走的是静态资源
            readFile('./static' + pathname).then(data => {
                res.end(data)
            }).catch(err => {
                res.statusCode = 500;
                readFile('./static/500.html').then(data => {
                    res.end(data);
                })
            })
        } else {
            //走接口
            getData(pathname, query, res)
        }

    }
}).listen(3000, function () {
    console.log('服务起于3000端口');

})
//         /list?type=dev   返回dev.json的内容   type=pro  返回pro.json的内容
function getData(pathname, query, res) {
    if (pathname === '/list') {
        query.type = query.type || 'dev';
        readFile('./json/'+query.type+'.json').then(data=>{
            res.end(data);
        }).catch(err=>{
            res.end('error')
        })
    }
}