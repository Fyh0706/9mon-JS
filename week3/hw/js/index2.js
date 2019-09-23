//获取数据展示到页面上
let data;
let oLis = document.getElementsByTagName("li");
let oLis2 = document.querySelectorAll("li");
//getELement系列获取到的元素集合是有映射关系的了当页面上增加了或者减少了 对应的元素 该变量会跟着默认能改变。
//query系列获取到的元素 没有这种映射关系，获取的时候是哪些元素，那么对应的变量就永远是哪些变量
let xhr = new XMLHttpRequest();//创造实例
xhr.open('get', './data.json', true); //true 代表异步 false 代表同步
xhr.onreadystatechange = () => {
    if (xhr.readyState == 4 && xhr.status == 200) {
        data = JSON.parse(xhr.response);
        render(data);//请求成功之后。再去渲染数据；
        myBind(data);
    }
}
xhr.send();
let box = document.querySelector("#box"),
    timeBtn = document.querySelector("#timeBtn"),
    priceBtn = document.querySelector("#priceBtn"),
    commentBtn = document.querySelector("#commentBtn");
function render(ary) {
    //把数据渲染到页面上
    //ary 就是后台传过来的数组
    let str = '';
    ary.forEach(item => {
        let { img, title, price, num } = item;
        str += ` <li>
                <div class="imgbox">
                    <img src=${img} alt="">
                </div>
                <div class="til">${title}</div>
                <div class="desc">${title}</div>
                <div class="price">￥${price}.00元</div>
                <div class="botBox">
                    <div>选购</div>
                    <div>${num}评价</div>
                </div>
            </li>`;

    });
    box.innerHTML = str;//str 就是拼接好的字符串
}
function myBind() {
    timeBtn.onclick = function () {
        box.appendChild(oLis[0]);//把第一个li元素 添加到box的末尾；
        //若添加的是页面上已经存在的元素，那么只是相当于改变一下元素的位置不会新增元素
        //DOM 的回流；当页面的结构发生改变的时候，需要浏览器重新渲染页面。
        //DOM 的重绘；结构不发生改变 只是样式（除了那些改变位置的修改）需要修改的时候 也就是只需要重新渲染对应的css的时候
    }
}
