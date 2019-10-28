let $box = $("#box"),
    $imgBox = $box.find('.img_box'),
    $tipBox = $box.find('.tip_box'),
    $lis = $imgBox.find('li'),
    $tips = $box.find('.tip'),
    $letfBtn = $box.find('.left_btn'),
    $rightBtn = $box.find('.right_btn'),
    n = 0,
    timer = null;

getData()
//获取数据
function getData() {
    $.ajax({
        type: 'get',
        url: './data.json',
        success: function (data) {
            console.log(data);
            render(data);
            eleBind();

        },
        error: function () {
            console.log('失败');

        }
    })
}
//渲染页面
function render(data) {
    let str = '',
        tipStr = '';
    data.forEach((item, index) => {
        str += `<li>
        <img src="${item.img}" alt="">
        <p>${item.desc}</p>
    </li>`;
        tipStr += (index == 0) ? `  <span class="tip current"></span>` : `\n<span class="tip"></span>`
    });
    $imgBox.html(str);
    $tipBox.html(tipStr);
    $lis = $imgBox.find('li');
    $tips = $box.find('.tip');
    $lis.eq(0).siblings().hide();
    autoMove();

}

function move() {
    n++;

    if (n >= $lis.length) {
        n = 0
    }
    $lis.eq(n).show().css({
        opacity: 0
    }).animate({
        opacity: 1
    }, 300).siblings().animate({
        opacity: 0
    }, 300, function () {
        $lis.eq(n).siblings().hide();
    });
    autoFouce(n);
}

function autoMove() {
    timer = setInterval(() => {
        move()
    }, 2000);
}

function autoFouce(n) {
    $tips.eq(n).addClass('current').siblings().removeClass('current')
}

function eleBind() {
    $tips.on("click", function () {        
        n = $(this).index();
        n--;
        move();
    });
    $box.on('mouseenter', function () {
        clearInterval(timer);
    })
    $box.on('mouseleave', function () {
        autoMove();
    })
    $letfBtn.on('click', throttle(function () {
        n--;
        if (n < 0) {
            n = $lis.length - 1;

        };
        n--;
        move();

    }));
    $rightBtn.on('click', throttle(function () {
        move();
    }));
}

function throttle(fn,wait=500) {
    let flag = true;
    return function () {
        if (!flag) return;
        flag = false;
        setTimeout(() => {
            flag = true;
            fn.apply(this, arguments);
        }, wait);
    }

}