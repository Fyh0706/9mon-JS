import http from './http'

let that = null;
export function init(_this) {
    that = _this
}
export function login(option) {
    return http.post('/user/login', option).then(data => {
        if (data.code == 1) {

            that.$alert('账号密码错误', '提示', {
                confirmButtonText: '确定',

            });
        } else if (data.code == 0){
            localStorage.setItem("power", data.power);
        }
            return data //给后边then的参数   
    })
}
export function signout(){
     return http.get('/user/signout')
}
export function judgeLogin() {
    return http.get('/user/login').then(data => {
        return data.code == 0
    })
}