//先去获取数据
function getData() {
    var xhr = new XMLHttpRequest();
    xhr.open('get', './data.json', true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && /200|304/.test(xhr.status)) {

            let date = JSON.parse(xhr.response);
            render(date);
        }
    }
    xhr.send();
}
getData();
let body = document.getElementsByClassName("body")[0],
    oLis = body.getElementsByTagName("li");
function render(data) {
    //data 是后台给的数组
    //循环数组 拼接字符串 把拼接号的字符串放到页面中
    let str = '';
    data.forEach(item => {
        let { pic, author, desc, height } = item;
        str = ` <div class="img-box">
        <img src="./img/2.jpg" alt="">
        <p class="desc">所谓伊人，在水一方！</p>
        <p class="author">泰勒·斯威夫特</p>
    </div>
        `;
        //str 是新拼出来的块  我们需要决定的是 这个块放到哪个li中;

    });

}
