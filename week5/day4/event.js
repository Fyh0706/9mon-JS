function on(ele, type, f) {
    if (/^my/.test(type)) {
        ele[type] = ele[type] || [];
        ele[type].push(f);
    } else {
        type = type.replace(/^on/, ''); //防止 传入的参数带着参数
        ele.addEventListener(type, f, false);
    }
    //原生事件 我们不需要造事件池;


    //不是原生事件我，我们创造一个事件池
    // ele.ary = ele.ary || [];
    // ele.ary.push(f);
}

function fire(ele, type, ...arg) {
    if (/^my/.test(type)) {
        ele[type] = ele[type] || [];
        ele[type].forEach(item => {
            item.call(this, ...arg)
        });
    }
    // ele.ary = ele.ary || [];
    // ele.ary.forEach(item => {
    //     item.call(this, ...arg)
    // });
}

function off(ele, type, f) {
    // ele.ary = ele.ary || [];
    // let n = ele.ary.indexOf(f);
    // n !== -1 ? ele.ary.splice(n, 1) : null;
    if (/^my/.test(type)) {
        ele[type] = ele[type] || [];
        let n = ele[type].indexOf(f);
        n !== -1 ? ele[type].splice(n, 1) : null;
    } else {
        type = type.replace(/^on/, '');
        ele.removeEventListener(type, f, false);
    }
}