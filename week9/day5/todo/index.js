Vue.directive('focus', function (el, obj) {
    if (obj.value) {
        setTimeout(() => {
            el.focus()
        }, 10);
    }
})
new Vue({
    el: '#app',
    data: {
        ary:[],
        todo: '',
        hash: '',//用来存储当前路径的hash
    },
    created() {
        this.hash = location.hash || '#/all';
        window.addEventListener('hashchange', () => {
            this.hash = location.hash;
        });
       
        this.ary =  JSON.parse(localStorage.getItem('todolist')) || this.ary;
    },
    methods: {
        add() {
            this.todo = this.todo.trim();
            if (!this.todo) return
            let obj = {
                id: Math.random(),
                done: false,
                todo: this.todo,
                editable: false
            }
            this.ary.unshift(obj);
            this.todo = '';
        },
        change(obj) {
            obj.editable = !obj.editable;
        },
        del(obj) {
            this.ary = this.ary.filter(item => item.id !== obj.id);
        },
        fn(e) {
            e.target.blur();
        }
    },
    computed: {
        cutTodo() {
            localStorage.setItem('todolist', JSON.stringify(this.ary));
            switch (this.hash) {
                case '#/all':
                    return this.ary
                    break;
                case '#/finished':
                    return this.ary.filter(item => item.done)
                    break;
                case '#/unfinished':
                    return this.ary.filter(item => !item.done)
                    break;
            }
        },
        number() {
            return this.ary.filter(item => !item.done).length;
        }

    }

})