(function () {
    //获取json数据
    let data;
    let xhr = new XMLHttpRequest;
    xhr.open('get', '././data.json', false);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            data = JSON.parse(xhr.response);
        }
    }
    xhr.send();
    function render(data) {
        let bodys = document.querySelector(".body");
        let str = "";
        data.forEach(item => {
            let { img, title, price, num, time } = item;
            str += ` <li>
        <p class="p-img">
            <a href="">
                <img src=${img} alt="" title=${title}>
            </a>
        </p>
        <p class="p-name">
            <a href="javascript:;" title=${title}>
                <span>${title}</span>
                <span>新品上市赠礼包</span>
            </a>
        </p>
        <p class="p-price">
            <b>¥${price.toFixed(2)}</b>
        </p>
        <div class="p-button ">
            <table>
                <tr>
                    <td><a href="">
                            <span>选购</span>
                        </a></td>
                    <td>
                        <span>${num}人评论</span>
                    </td>
                </tr>
            </table>
        </div>
        <p class="p-time">${time}</p>
    </li>`
        });
        bodys.innerHTML = str;
    }
    render(data);
    timeBtn.flag = priceBtn.flag =evBtn.flag=1;
    function fn(classN, img, px1, px2) {
        return function () {
            if (this.flag > 0) {
                img.style.backgroundPositionY = px1;
            } else {
                img.style.backgroundPositionY = px2;
            }
            this.flag *= -1;
            data.sort((a, b) => {
                return (a[classN] - b[classN]) * this.flag;
            })          
            render(data);
        }
    }
    let timeimg = document.getElementById("timeimg");
    let priceimg = document.getElementById("priceimg");
    let evimg=document.getElementById("evimg");
    timeBtn.onclick = fn("time", timeimg, "-110px", "-90px");
    priceBtn.onclick = fn("price", priceimg, "-110px", "-90px");
    evBtn.onclick=fn("num",evimg,"-51px","-46px");
})()









