ajax({
    method: 'post', //不说必须的  默认是 get
    url: './data.json', //必须的
    data: {
        //传给后台的数据  不是必须的

    },
    async: true, //同步 异步  不是必须  : 默认异步 true
    cache: true, //走不走缓存  false  不走缓存  默认true 走缓存 
    headers: {
        //设置请求头
    },
    success() {
        //成功回调
    },
    error() {
        //失败回调
    }
})

function ajax(options) {
    let {
        method = 'get', //默认走get
            url='',
            data = {}, //默认空对象
            async = true, //默认走异步
                cache = true, //默认走缓存
                headers = {},
                success,
                error

    } = options;
    //处理data

    let searchStr = '';
    for (const k in data) {
        searchStr += `${key}=${data[key]}&`;
    }
    searchStr = searchStr.replace(/&$/, '');
    method = method.toLowerCase(); //防止大写
    if (method === 'get') {
        //之前的url上有没有?
        url += (url.indexOf('?') === -1) ? '?' + searchStr : '&' + searchStr;
        if (!cache) {
            url += `&_+${Date.now()}`
        }

    }

    let xhr = new XMLHttpRequest();
    xhr.open(method, url, async);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (/200|304/.test(xhr.status)) {
                let data;
                try {
                    data = JSON.parse(xhr.response);
                } catch (error) {
                    data = xhr.response;
                }

                success && success(data);
            } else if (/[45]\d{2}/.test(xhr.status)) {
                error && error(xhr);

            }
        }
    };
    headers = Object.assign({
        'content-type': 'application/x-www-form-urlencoded'
    }, headers);
    for (const key in headers) {
        xhr.setRequestHeader(k, escape(headers[k])); //escape处理中文
    }
    xhr.send(searchStr);

}