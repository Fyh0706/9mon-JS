class Tab {
    constructor(idSelector) {
        this.box = document.querySelector(idSelector);//获取最外层盒子
        this.tabs = this.box.querySelectorAll('.tab');
        this.bodys = this.box.querySelectorAll('.body');
        this.mapBind();//new 的时候执行
    }
    mapBind() {
        //this 都是Tab的实例
        //this.tabs 是我们要去绑定的元素
        for (let i = 0; i < this.tabs.length; i++) {
            this.tabs[i].onclick = () => {
                //    给每一个tab绑定点击事件；
                this.clearClass();
                this.tabs[i].className = "tab current";
                this.bodys[i].className = "body current"
            }
        }
    }
    clearClass() {
        //清除类名     this.tabs  this.bodys 上的current 清除
        for (let i = 0; i < this.tabs.length; i++) {
            this.tabs[i].className = "tab";
            this.bodys[i].className = "body";

        }
    }


}

new Tab('#box')
new Tab('#box2')
new Tab('#box3')
