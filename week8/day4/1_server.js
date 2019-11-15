let express = require('express');
let qs=require('qs');
//express 是 nodeJs 的一个库 相当于 JS 的 JQuery
let app = express();
app.listen(8000, function () {
    console.log('服务起于 8000 端口');

})
//express使用中间件
app.use((req, res, next) => {
    req.qqq = 123456;
    next();
})
app.use((req, res, next) => { //req 请求信息  res响应信息
    console.log(req.qqq);
    res.header('ha', "haha");
    next();

})
app.use(express.static('./static')); //express.static是express提供的一个访问静态页面的方法
app.get('/list', function (req, res) {
    //该回调函数  只要当前请求的是/list 这个路径  并且方法是get 方法的时候 才会执行
    console.log(req.query);

    res.send({
        qqq: req.qqq
    })
})
app.post('/add',function(req,res){
      let str='';
      req.on('data',function(chunk){
          str+=chunk;
      })
      req.on('end',function(){
       let obj={};
       try {
           obj=JSON.parse(str)
       } catch (error) {
           obj=qs.parse(str)
       }

        // console.log(qs.parse(str));
        
        //   console.log(JSON.parse(str));
        //   console.log(str,str.a);
          console.log(obj,obj.a);
          
          
      })
    res.send({
       code:0,
       data:'success'
    })
    
})