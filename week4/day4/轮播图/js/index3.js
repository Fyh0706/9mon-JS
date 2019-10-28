let $box = $('#box'),
    $ul = $box.find('ul'),
    $tipBox = $box.find('.tip_box'),
    $tips = $tipBox.children('.tip'),
    $leftBtn = $box.find('.left_btn'),
    $rightBtn = $box.find('.right_btn');
let n = 0,
    timer = null;
console.log($ul);
//获取数据
getData();

function getData() {
    $.ajax({
        type: 'get',
        url: './data.json',
        success: function (data) {
            //请求成功 执行
            console.log(data);
            render(data);
            automove();
            tipClick();
        },
        error: function () {
            //请求失败 执行
            document.body.innerHTML = "系统繁忙";
        }
    })
}

function render(data) {
    let str = '';
    let tipStr = '';
    data.push(data[0]);
    data.forEach((item, index) => {
        str += `<li>
       <img src="${item.img}" alt="">
       <p class="desc">${item.desc}</p>
      </li>
       `;
        if (index == 0) {
            tipStr += `<span class="tip current"></span>\n`;
        } else if (index < data.length - 1) {
            tipStr += `<span class="tip"></span>\n`
        }
    });
    $tipBox.html(tipStr);
    $ul.html(str);
    $ul.width(590 * data.length);
    $tips = $tipBox.children('.tip'); //更新
}

function move() {
    n++;
    if (n > $tips.length) {
        n = 1;
        $ul.css("left", 0)
    }
    $ul.animate({
        left: -590 * n
    }, 300);
    autoFocus(n)
}

function automove() {
    timer = setInterval(() => {
        move();
    }, 2000)
}

function autoFocus(m) {
    if (m >= $tips.length) {
        m = 0; //m==$tip.length 显示的是伪第一张
    }
    //m 就是要有点的那个索引
    $tips.eq(m).addClass('current').siblings().removeClass('current')
}



$box.on('mouseenter', function () {
    clearInterval(timer);
})
$box.on('mouseleave', function () {
    automove();
})
$leftBtn.on('click', function () {
    n--;
    if (n < 0) {
        $ul.css({
            left: -590 * $tips.length
        });
        n = $tips.length - 1;
    }
    $ul.animate({
        left: -n * 590
    }, 200);
    autoFocus(n);
})
$rightBtn.on('click', function () {
    move();
})

function tipClick() {
    $tips.on("click", function () {
        let m = $(this).index();
        n = m;
        console.log();
        $ul.animate({
            left: -590 * m
        }, 200)
        autoFocus(m);
    })
}

$.fn.extend({
    banber: function () {
        console.log(this);

    }
})

// try {
//     console.log(555);

//     console.log(qqq);


// } catch (aaa) {
//     console.log(aaa);

// }