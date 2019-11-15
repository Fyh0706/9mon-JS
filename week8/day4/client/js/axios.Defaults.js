axios.defaults.baseURL = 'http://127.0.0.1:8888';
axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded';
//是否携带cookie
axios.defaults.withCredentials = true;
axios.defaults.transformRequest = function (data = {}) {
    //处理post请求参数
    let str = '';
    for (const key in data) {
        str += `${key}=${data[key]}&`;
    }
    return str.replace(/&$/, '');
}
// 添加请求拦截器
axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    return response.data;
}, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});