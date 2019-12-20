module.exports={
    publicPath:'./',
    lintOnSave:false,//不让eslint报错
    devServer:{
        //本地访问localhost：8080的时候  由node 把请求转接到代理地址
        proxy:'http://localhost:3000'
    }
}