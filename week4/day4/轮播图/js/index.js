let ul = document.querySelector("#box .img_box ul"),
    box = document.querySelector("#box"),
    tipBox = document.querySelector('#box .tip_box'),
    tip = document.getElementById("box").getElementsByClassName("tip"),
    leftBtn = document.querySelector("#box .left_btn"),
    rightBtn = document.querySelector("#box .right_btn")
//获取数据


function getDate() {
    let xhr = new XMLHttpRequest();
    xhr.open('get', './data.json', true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && /200|304/.test(xhr.status)) {
            let data = JSON.parse(xhr.response);
            console.log(data);
            render(data);
            move(); //数据渲染完成之后开启动画
            tipclick();
        }
    }
    xhr.send();
}
getDate();
//渲染数据


function render(data) {
    data = data || [];
    data.push(data[0]); //在数组的末尾添加了第一项
    let str = '';
    let tipstr = '';
    data.forEach((item, index) => {
        let {
            img,
            desc
        } = item;
        str += `
            <li>
            <img src="${img}" alt="">
            <p class="desc">${desc}</p>
            </li> 
       `;
        if (index !== data.length - 1) {
            if (index == 0) {
                tipstr += ` <span class="tip current"></span>\n` //只有第一项才默认有current;
            } else {
                tipstr += `<span class="tip"></span>\n`
            }
        }
    });
    ul.innerHTML = str;
    ul.style.width = data.length * 590 + 'px'; //更新盒子的宽度
    tipBox.innerHTML = tipstr;
}
let timer;
let n = 0;


function move() {
    timer = setInterval(() => {
        change();
    }, 2000)
}


function change() {
    n++;
    if (n == (tip.length + 1)) {
        ul.style.transition = 'none';
        ul.style.left = 0 + 'px'; //让图片直接闪到第一张，紧接着要向第二张图移动。
        n = 1;
    }
    // animate(ul, { left: -590 * n }, 500, tipClass(n));//圆点跟随在动画结束之后
    tipClass(n);
    setTimeout(() => {
        //同步情况下，代码从上到下执行的时候，只会让下班的代码起作用，上边代码会被覆盖
        //异步情况下，异步代码会被忽略 同步先执行，异步再执行。
        ul.style.transition = 'left 0.5s ease-in';
        ul.style.left = -590 * n + 'px';
    }, 10)

    // ul.style.transition = 'left 0.5s ease-in';
    // ul.style.left = -590 * n + 'px';
}


//滑入盒子清除动画
box.onmouseenter = function () {
    clearInterval(timer);
}
box.onmouseleave = function () {
    move();
}


function tipClass(m) {
    m = m >= tip.length ? 0 : m
    for (let i = 0; i < tip.length; i++) {
        tip[i].className = "tip";
    }
    tip[m].className = 'tip current'
}
//点击左右按钮执行的操作
// rightBtn.onclick = function () {
//     change();
// }
rightBtn.onclick=debouce(function() {
    change();
})

leftBtn.onclick = function () {
    n--;
    //n==-1的时候 ,
    if (n < 0) {
        ul.style.transition = 'none';
        ul.style.left = -590 * (tip.length) + 'px';
        n = tip.length - 1;
    }
    tipClass(n)
    setTimeout(() => {
        //同步情况下，代码从上到下执行的时候，只会让下班的代码起作用，上边代码会被覆盖
        //异步情况下，异步代码会被忽略 同步先执行，异步再执行。 
        ul.style.transition = 'left 0.5s ease-in';
        ul.style.left = -590 * n + 'px';
    }, 10)
}


function tipclick() {
    for (let i = 0; i < tip.length; i++) {
        tip[i].onclick = function () {
            n = i;
            tipClass(n)
            ul.style.transition = 'none';
            // ul.style.transition = 'left 0.5s ease-in';
            ul.style.left = -590 * n + 'px';
        }
    }
}

function debouce(fn, wait = 500){
    let timer = null;
    return function () {
        clearInterval(timer);
        timer = setTimeout(() => {
            fn.apply(this, arguments)
        }, wait)
    }
}