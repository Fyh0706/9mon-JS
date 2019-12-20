Vue.filter('money', function (val) {
    return '￥' + (val / 100).toFixed(2)
})

new Vue({
    el: "#app",
    data: {
        name: '珠峰',
        dataList: [],
        // total: 0,
        // checkAll: true,
        show: false,
        delIndex: 0

    },
    created() {
        //当前实例创建完成会触发该函数   钩子函数
        this.getData();
    },
    methods: {
        getData() {
            fetch('http://127.0.0.1:8000/jd/list').then(response => {
                return response.json()
            }).then(data => {
                this.dataList = data.data;
                console.log(this.dataList);

                // this.sum();
                //重置checkAll属性
                // this.checkAll = this.dataList.every(item => item.isSelect);
                // console.log(data);
            }).catch((err) => {
                console.log(err);
            })
        },
        // sum() {
        //     //求总价
        //     //this.dataList.filter(item=>item.isSelect) 筛选出 选中的商品
        //     this.total = this.dataList.filter(item => item.isSelect).reduce((prev, next) => {
        //         return prev + next.count * next.price
        //     }, 0)
        // },
        checkOneFn(obj) {//obj为点击的那个数据
            fetch('http://127.0.0.1:8000/jd/isselect', {
                method: 'post',
                body: JSON.stringify({ id: obj.id, isSelect: obj.isSelect })
            }).then(data => {
                if (data.code == 0) {
                    // this.checkAll = this.dataList.every(item => item.isSelect);
                    // this.sum();
                }
            })
        },
        // checkAllFn() {
        //     this.dataList.forEach(item => {
        //         item.isSelect = this.checkAll
        //     });
        //     //重新计算总价
        //     // this.sum()

        // },
        del(n) {
       
            this.show = true;
            this.delIndex = n;

        },
        cancel() {
            this.show = false;
        },
        sure() {
            this.show = false;
            this.dataList.splice(this.delIndex, 1);
            // this.sum();
            // this.checkAll = this.dataList.every(item => item.isSelect);
        },
        clear() {
            this.dataList = [];
            // this.sum();
          
        }


    },
    computed: {
        total() {
            return this.dataList.filter(item => item.isSelect).reduce((prev, next) => {
                return prev + next.count * next.price
            }, 0)
        },
        checkAll: {
            get() {
                if(this.dataList.length===0){
                    return false;
                }
                return this.dataList.every(item => item.isSelect);
            },
            set(val) {
                this.dataList.forEach(item => item.isSelect = val);
            }
        }
    },

})