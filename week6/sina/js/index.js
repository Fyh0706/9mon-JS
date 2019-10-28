 let slideBox = document.querySelector("#slideBox");

 function swiperInit() {
     var swiper = new Swiper('.swiper-container', {
         pagination: {
             el: '.swiper-pagination',
             type: 'fraction',
         },
         loop: true,
         autoplay: true
     });
 }


 function getData(url, cb) {
     let xhr = new XMLHttpRequest();
     xhr.open('get', url, true);
     xhr.onreadystatechange = function () {
         if (xhr.readyState === 4 && /200|304/.test(xhr.status)) {
             let data = JSON.parse(xhr.response);
             cb && cb(data); //cb存在 并且执行
         }
     }
     xhr.send();
 }
 getData('./data/banner.json', function (data) {
     render(data);
     swiperInit();
 });
 getData('./data/list.json', function (data) {
     rederList(data);
 })

 function render(data) {
     let str = '';
     data.forEach(item => {
         let {
             img,
             title
         } = item;
         str += `<div class="swiper-slide">
                        <img src="${img}" alt="">
                        <p>${title}</p>
                </div>`
     });
     slideBox.innerHTML = str;

 }

 function rederList(data) {
     let str = '';
     data.forEach(item => {
         if (item.type === 0) {
             //无图
             str += `   <div class="list">
             <div class="textBox">
                 <p>你好奥德哈卡等会我看见父亲golf快回去</p>
                 <div class="commentBox">
                     <span class="icon_com"></span>
                     <span >${item.commentNum}</span>
                     <span>珠峰传销</span>
                 </div>
             </div>
            
         </div>
            `
         } else {
             //有图
             str += `
             <div class="list">
             <div class="textBox">
                 <p>你好奥德哈卡等会我看见父亲golf快回去</p>
                 <div class="commentBox">
                     <span class="icon_com"></span>
                     <span >${item.commentNum}</span>
                     <span>珠峰传销</span>
                 </div>
             </div>
             <div class="imgBox">
                 <img src="${item.img}" alt="">
             </div>
         </div>
            `
         }

     })
     document.querySelector('.listBox').innerHTML = str;
 }