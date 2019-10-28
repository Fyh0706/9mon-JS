 let bell = document.querySelector('#bell'),
     say = document.querySelector('#say'),
     bgm = document.querySelector('#bgm');

 function loadBox() {
     let progress = document.querySelector('.progress'); //获取进度条
     let btn = document.querySelector('.btn');
     let loadingBox = document.querySelector('.loadingBox');
     let ary = ['phone-bg.jpg',
         'phone-listen.png', 'phone-key.png', 'phone-logo.png', 'phone-name.png', 'message-head1.png', 'message-head2.png', 'message-keyboard.png', 'cube-bg.jpg', 'cube-img1.png', 'cube-img2.png', 'cube-img3.png', 'cube-img4.png', 'cube-img5.png', 'cube-img6.png', 'cube-tip.png', 'menu-icon.png', 'concat-address.png', 'concat-icon1.png', 'concat-icon2.png', 'course-icon1.png', 'course-icon2.png', 'course-icon3.png', 'course-icon4.png', 'course-icon5.png', 'course-icon6.png', 'course-icon7.png', 'course-pocket.png', 'school-bot1.png', 'school-bot2.png', 'school-img1.jpg', 'school-img2.jpg', 'school-img3.jpg', 'teacher-title.png', 'zf-detailsReturn.png', 'zf-jobTable.png', 'zf-teacher1.png', 'zf-teacher2.png', 'zf-teacher3.jpg', 'zf-teacher4.png', 'zf-teacher5.png', 'zf-teacher6.png'
     ];
     let n = 0; //记录已经加载过来的图片张数
     ary.forEach(item => {
         let img = new Image();
         img.src = `./images/${item}`;
         img.onload = function () {
             n++;
             let per = n / ary.length;
             progress.style.width = per * 100 + '%';
             if (n === ary.length) {
                 // 所有图片都一经加载完成

                 progress.addEventListener('transitionend', function (e) {
                     e.stopPropagation();
                     btn.classList.remove('hide');

                     // 阻止progress动效完成之后的冒泡
                 }, false)
             }
         }
     })
     btn.ontouchend = function () {
         loadingBox.style.opacity = 0;
         loadingBox.addEventListener('transitionend', function (e) {
             // console.log(e)
             if (e.propertyName === 'opacity') {
                 bell.play();
                 loadingBox.classList.add('hide');
                 phoneBoxFn(); // 第一屏完成之后再来第二屏
             }
         }, false)
     }
 }
 loadBox();

 function phoneBoxFn() {

     let phoneBox = document.querySelector('.phoneBox'),
         circle = document.querySelector('.phoneBox .circle'),
         timeBox = document.querySelector('.phoneBox header h3'),
         footer = document.querySelector('.phoneBox footer'),
         overBox = document.querySelector('.phoneBox .overBox'),
         overBtn = overBox.querySelector('.overBtn');
     let clearFn = null; //为了清除时间定时器
     circle.addEventListener('touchend', function () {
         timeBox.classList.remove('hide'); //显示时间
         footer.classList.add('hide');
         overBox.classList.remove('bot');
         bell.pause(); //点击接听键
         say.play();
         cleraFn = changeTime();
     }, false); //click 300ms 延迟  //passive  true  false  
     // capture  true 再捕获阶段触发  false改为{passive:true,capture :true}
     function changeTime() {
         //设置时间
         let timer = setInterval(() => {
             //say.currenttime  当前播放时间
             let t = parseInt(say.currentTime);
             timeBox.innerHTML = `00:${t<10?'0'+t:t}`;
             if (say.ended) {
                 clearInterval(timer);
                 phoneBox.style.transform = 'translateY(110%)';
                 chatBoxFn();
                 bgm.play();
             }
         }, 1000);
         return function () {
             clearInterval(timer);
         }
     }
     overBtn.ontouchend = function () {
         //点击挂机键
         say.pause();
         clearFn();
         bgm.play();

         phoneBox.style.transform = 'translateY(110%)';
         chatBoxFn();


         // phoneBox.addEventListener('transitionend', function (e) {

         //     chatBoxFn();//上一屏结束之后再执行
         // }, false)

     }
 }


 function chatBoxFn() {
     let chatMsgBox = document.querySelector('.chatBox .chatMsgBox');
     let oLis = document.querySelectorAll('.chatBox ul li'),
         keyboard = document.querySelector('.chatBox .keyboard'),
         p = keyboard.querySelector('p'),
         chatBtn = keyboard.querySelector('.chatBtn'),
         timer = null,
         n = 0; //记录显示的条数;
     timer = setInterval(() => {
         oLis[n].classList.remove('opa');
         n++;
         if (n === 3) {
             clearInterval(timer);
             setTimeout(() => {
                 keyboard.classList.remove('bot');
             }, 500);
             setTimeout(() => {
                 input();
             }, 1000)
         }
     }, 1000);

     function input() {


         let str = '我们现在使用的是VUE和REACT';
         let n = 0,
             timer = null;
         timer = setInterval(() => {
             p.innerHTML += str[n];
             //文字输入完成之后提交亮起来
             chatBtn.classList.remove('hide');
             n++;
             if (n >= str.length) {
                 clearInterval(timer);

             }
         }, 100)
     }
     chatBtn.ontouchend = function () {
         p.innerHTML = ''; //清空输入框
         keyboard.classList.add('bot') //让键盘下去
         oLis[n].classList.remove('opa'); //让第四条直接出现
         n++;

         timer = setInterval(() => {
             oLis[n].classList.remove('opa');
             move();
             n++;
             if (n === oLis.length) {
                 //所有对话完成
                 clearInterval(timer);
             }
         }, 1000);
     }
     let t = 0;

     function move() { //负责让整个盒子向上移动， 每次移动出现盒子的高度
         let m = oLis[n].clientHeight;
         t += m;
         chatMsgBox.style.transform = `translateY(-${t}px)`;
     }
 }