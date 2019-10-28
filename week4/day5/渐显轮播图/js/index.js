 let $ul = $('#box .img_box ul'),
     $tipBox = $('#box .tip_box');
 let n = 0,
     timer = null,
     $lis = $('#box .img_box ul li'),
     $tips = $('#box .tip_box .tip'),
     $box = $('#box'),
     $leftBtn = $('#box .left_btn'),
     $rightBtn = $('#box .right_btn');


 (
     function getData() {
         $.ajax({
             url: './data.json',
             success: function (data) {
                 render(data);
                 init();
             }
         })
     }

 )()

 function render(ary) {
     let str = '';
     let tipStr = '';
     ary.forEach((item, index) => {
         str += `  <li>
             <img src="${item.img}" alt="">
             <p>${item.desc}</p>
             </li>`
         tipStr += (index == 0) ? ` <span class="tip current"></span>` : ` <span class="tip"></span>`
     })
     $ul.html(str);
     $tipBox.html(tipStr);
 }

 function init() {
     $lis = $('#box .img_box ul li');
     $tips = $('#box .tip_box .tip');
     $lis.eq(0).siblings().hide();
     autoMove();

 }

 function move() {
     n++;
     if (n >= $lis.length) {
         n = 0;
     }
     console.log(n);

     //  $lis.eq(n).show().siblings().hide();
     $lis.eq(n).css({
         opacity: 0
     }).show().animate({
         opacity: 1
     }, 500).siblings().animate({
         opacity: 0
     }, 500, function () {
         $lis.eq(n).siblings().hide();
     });
     autoFocus();
 }

 function autoMove() {
     timer = setInterval(() => {
         move();
     }, 2000)
 }

 function autoFocus() {
     $tips.eq(n).addClass('current').siblings().removeClass('current');
 }
 $box.on('mouseenter', function () {
     clearInterval(timer);
 })
 $box.on('mouseleave', function () {
     autoMove();
 })
 $leftBtn.on('click', _.throttle(function () {
     n--;
     if (n < 0) {
         n = $lis.length - 1;
     }
     n--;
     move();
 },1000))
 $rightBtn.on('click', _.throttle(function () {
     move();
 },1000))
