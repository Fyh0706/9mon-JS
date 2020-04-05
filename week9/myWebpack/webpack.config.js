let path = require('path')
let hp = require("html-webpack-plugin")
//对于node 来说  每一个js文件都是一个模块  
//每个模块 都有 module exports rquire  __dirname  __filename
console.log('你好' + path.resolve(__dirname, 'qqq'));
// path.resolve(__dirname,'qqq')  是把 当前文件 所在文件夹的路径 和 qqq 拼接起来
module.exports = {
    //配置对象
    //这里写的全是webpack的配置信息
    mode: 'development',
    entry: './src/2.js',
    output: {
        filename: 'qqq.js',//默认是main.js
        path: path.resolve(__dirname, 'qqq')//告诉webpack把生成的文件放到哪个路径下边
    },
    plugins: [
        new hp({
            template: './public/index.html'  //该路径下的html作为模板
        })
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                use:['babel-loader'],
                exclude:/node_modules/
            }
        ]
    }
}