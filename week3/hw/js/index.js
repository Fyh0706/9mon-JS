//获取数据展示到页面上
let data;
let xhr = new XMLHttpRequest();//创造实例
xhr.open('get', './data.json', true); //true 代表异步 false 代表同步
xhr.onreadystatechange = () => {
    if (xhr.readyState == 4 && xhr.status == 200) {
        data = JSON.parse(xhr.response);
        render(data);//请求成功之后。再去渲染数据；
        myBind(data);
    }
}
xhr.send();//发送请求
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
function myBind(data) {
    function Btn(ele, key) {
        ele.flag = 1;
        ele.onclick = function () {
            this.flag *= -1
            data.sort((a, b) => (a[key] - b[key]) * this.flag)
            render(data);//把排好序的数组重新渲染一下
        }
    }
    Btn(timeBtn, "time");
    Btn(priceBtn, "price");
    Btn(commentBtn, "num");
}
// var a =document.createDocumentFragment();//文档碎片

 //点击上架时间
