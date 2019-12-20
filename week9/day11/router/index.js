(function (global, factory) {
    global.VueRouter = factory();
})(this, function () {
    class VueRouter {
        constructor(options) {
            let {
                routes
            } = options;
            //routes[{path:'/a',component:a}]
            //[{'/a',a}]
            this.routerMap = routes.reduce((obj, cur) => {
                obj[cur.path] = cur.component;
                return obj
            }, {})
            window.addEventListener('load',()=>{
                location.hash=location.hash ||'/'
            });
            Vue.util.defineReactive(this,'_route','/');
            this._route=location.hash.slice(1)
            window.addEventListener('hashchange',()=>{
                this._route=location.hash.slice(1)
            })
        }
    }
    VueRouter.install = function (_Vue) {
        //只要Vue.use()执行了 这个install方法就会执行
        console.log(_Vue);
        _Vue.mixin({
            beforeCreate() {
                //   console.log(this);
                if (this.$options && this.$options.router) {
                    this._router = this.$options.router;
                } else {
                    this._router = this.$parent._router
                }
            },
        })
        _Vue.component('router-link', {
            props: {
                to: String//要接收一个to属性 类型需要是一个字符串
            },
            // template:`<a :href='"#"+to'><slot></slot></a>`
            render(h) {//jsx
                return h('a', {
                    attrs: {
                        href: '#' + this.to
                    }
                }, this.$slots.default)
            }

        })
        _Vue.component('router-view',{
            render(h){
                //this router-view 组件
                return h(this._router.routerMap[this._router._route])
            }
        })

    }
    return VueRouter;
})