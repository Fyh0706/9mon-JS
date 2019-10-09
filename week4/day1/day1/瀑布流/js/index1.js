/* 
 
  1.获取数据 封装成一个函数，去实现获取数据的动作
  2.渲染数据 把从后台获取到的数据展示到页面上，按照列来展示的
            循环后台给的数组，然后把每一条数据拼接好，添加到长度最小的那一列
            这里封装了一个获取长度最小的列的方法 getMinLi
            把元素集合转为数组，然后按照clientHeight 进行排序 由此找到最低的那个Li;
  3.滚动加载更多，长度最小的那个Li 底部露出来的时候我们去加载新的数据，loadMore
    为了防止一次性请求多次我们做了一个flag判断，只有当flag为false的时候才去执行新数据的请求。当请求开始的时候我么们把flag置为true 渲染成功我们把flag再置为flase
  4.再加上图片懒加载的操作；loadImg loadAll 
  懒加载 就是当图片还没有出现到可视窗口的时候 不去加载图片， 只有当图片露出来的时候 我们才去加载真正的图片
  预加载  就是 图片要展示成真正的图片时， 先用 默认图展示， 然后再利用Js创建一个临时的图片，让这张临时的图片去远程请求 真正的图片 当请求成功之后， 再把这个真实图片的地址赋给页面上的那个IMG标签。
 5 实现图片的渐现 利用定时器 对img进行opcity 的累加操作；
 
 */
let flag = false;
let oList = document.querySelectorAll(".body li")
let box = document.getElementsByClassName("body")[0],
 imgs = box.getElementsByTagName('img');
function getData() {
    flag = true;
    let xhr = new XMLHttpRequest();
    xhr.open('get', './data.json', true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && /200|304/.test(xhr.status)) {
            let data = JSON.parse(xhr.response);
            reader(data);
            flag = false;
            loadAll();
        }
    }
    xhr.send();
}

getData();

function reader(ary) {
    let str = '';
    ary.forEach(item => {
        let { desc, pic, height, author } = item;
        str = `  <img  realSrc= "${pic}"  alt="" style='height:${height}px'>
        <p class="desc">${desc}</p>
        <p class="author">"${author}</p>
        `;
        let temp = getMinLi();
        let div = document.createElement('div');
        div.className = 'img_box';
        div.innerHTML = str;
        temp.appendChild(div);
    });

}
//最小的li
function getMinLi() {
    let ary = [...oList].sort((a, b) => a.clientHeight - b.clientHeight);
    return ary[0];
}
//滚动加载更多
window.onscroll = function () {
this.logadMore();
this.loadAll();
}
function logadMore() {
    let li = getMinLi();
    if (utils.offset(li).t + li.clientHeight <= document.documentElement.scrollTop + utils.winH().h) {
        if (!flag) {
            getData();
        }

    }
}
function loadImge(ele) {
    if (ele.myLoad) return;
    if (utils.offset(ele).t + ele.clientHeight / 2 <= document.documentElement.scrollTop + utils.winH().h) {
        let realSrc = ele.getAttribute('realSrc');
        let temp = new Image();
        temp.src = realSrc;
        temp.onload = function () {
            ele.src = realSrc;
            ele.myLoad = true;
            faseIn(ele);
        }
        temp = null;
    }

}
function loadAll() {
      [...imgs].forEach(item=>{
          loadImge(item);
      })
}
function faseIn(ele) {
    ele.style.opacity=0;
    let n=0;
    ele.timer=setInterval(()=>{
        n+=0.01;
        if(n>=1){
            n=1;
            clearInterval(ele.timer);
        }
        ele.style.opacity=n;
    },10);
    
}