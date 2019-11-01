function ajax(url, options) {
    let { method = 'get',
        data = {},
        cache = true,//是否走缓存
        async = true,//同异步
        headers = {}
    } = options;
    let isGet = method.toLowerCase() === 'get';//判断是否是get
    let searctStr = '';
    for (let k in data) {
        searctStr += `&${k}=${data[k]}`;
    }
    searctStr = searctStr.slice(1);
    if (isGet) {
        url = url.indexOf('?') === -1 ? url + "?" + searctStr : url + "&" + searctStr;
    }
    return new Promise(function (res, rej) {
        let xhr = new XMLHttpRequest();
        xhr.open(method, url, async);
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                if (/2\d{2}|304/.test(xhr.status)) {
                    let date = JSON.parse(xhr.response)
                    res(data)
                } else if (/[45]\d{2}/.test(xhr.status)) {
                    rej(xhr)
                }
            }
        };
        xhr.send(JSON.stringify(data));
    });
}
ajax.get=function(url,data){
      return ajax(url,{
          data
      });
}
ajax.post=function(url,data){
      return ajax(url,{
          method:'post',
          data
      });
}