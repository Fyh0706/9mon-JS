$(function () {
    //dom结果加载完成执行这个函数
    $('.submit').on('click', function (e) {
        let account = $('.userName').val();
        let password = $('.userPass').val();
        console.log(account, password);
        if (!account || !password) {
            alert('用户名或密码不能为空');
            return
        }
        password = md5(password);
        axios.post('/user/login', {
            account,
            password
        }).then((data) => {
            //登陆成功
            //1.跳转首页
            //2.存储权限信息
            console.log(data);
            if (data.code === 0) {
                //密码正确
                
                alert('登陆成功',{
                    handled(){
                        window.location.href=`./index.html`;
                    }
                })
                //把权限信息存入本地
                localStorage.setItem('power',data.power);
                //存储用户名
                localStorage.setItem('username',account);

            } else {
                alert('账号或密码错误');

            }
        }, (err) => {

            alert('系统繁忙,请稍后重试')
            console.log(err);

        })

    })
})