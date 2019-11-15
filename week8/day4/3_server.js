//实现一个登陆的功能
let express = require('express');
let qs = require('qs');
let session = require('express-session');
let {
    readFile,
    writeFile
} = require('./promiseFs');
let app = express();
app.listen(8000, function () {
    console.log("后端接口服务起于 ： 8000 端口");

})
//解决跨域
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000')
    res.header('Access-Control-Allow-Credentials', true)
    next();
})
//解决post请求的参数  转成普通对象  存放到req.body上
app.use((req, res, next) => {
    let str = '';
    req.on('data', (chunk) => {
        str += chunk;
    })
    req.on('end', () => {
        let obj = {};
        try {
            obj = JSON.parse(str)
        } catch (error) {
            obj = qs.parse(str)
        }
        req.body = obj;
        next();
    })
})
   //登陆成功 需要后端给前端种植一个cookie
app.use(session({
    //在这个中间件之后 会在req 上多了一个 session属性
    name: 'hello',//默认为 connect.id
    secret: 'myqqq',//session 会根据 这个属性 和后端种在session的属性名 来生成对应的字段
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60
    }
}))
//把读取数据的操作放到中间件上处理
app.use((req, res, next) => {
    readFile('./user.json').then(data => {
        req.data = JSON.parse(data);
        next();
    }).catch(err => {
        //读取失败给前端状态码为500
        res.status(500);
        res.send('');
    })
})
app.post('/reg', function (req, res) {
    //注册接口
    let {
        username,
        password
    } = req.body;
    let data = req.data;
    let bol = data.some(item => {
        return item.username === username
    })
    //bol 为true 证明之前有这个账号 
    if (bol) {
        res.send({
            code: 1,
            msg: 'already ha this man'
        })

        return;
    }
    data.push(req.body);
    writeFile('./user.json', JSON.stringify(data)).then(data => {
        //写入成功
        res.send({
            code: 0,
            data: "success"
        })
    }).catch(err => {
        res.status(500);
        res.send('');
    })

})
app.post('/login', function (req, res) {
    let {
        username,
        password
    } = req.body
    let bol = req.data.some(item => {
        return item.username == username && item.password == password
    })
    if (bol) {
        //登陆成功 需要后端给前端种植一个cookie
    //    console.log(req.session);
       req.session.userID=username;//咱们后端在session上种植了一个属性
       
        res.send({
            code: 0,
            data: {
                username
            }
        })
    } else {
        res.send({
            code: 2,
            msg: '用户名密码错误'
        })
    }


})
app.get('/info',function(req,res){
    console.log(req.session.userID);
    //登陆成功之后后端会给前端种植一个cookie 
    //以后每一次请求后端接口的时候  后端都会根据这个cookie值 去判断 前端是否处于有效期内
    //后端的具体写法 就是  根据登陆时 在session 上设置的属性 还有没有 来进行判断
    if(req.session.userID){
        res.send({
            code:0,
            data:{
                name:req.session.userID,
                sex:0,
                age:18
            }
        })
    }else{
        res.send({
            code:1,
            msg:'NO LOGIN'
        })
    }
    
})