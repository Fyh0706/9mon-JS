$(function () {
    let $nameBox = $('.baseBox span'),
        $outBtn = $('.baseBox a'),
        $iframe = $('iframe'),
        $menuBox = $('.menuBox'), //菜单盒子
        $as = $menuBox.find('a');
    //从本地获取用户名
    $nameBox.html('您好：' + localStorage.getItem('username'));

    //点击退出要做的事
    $outBtn.on('click', function () {
        alert('确定退出?', {
            confirm: true,
            handled: function (type) {
                console.log(type);
                //type 为 CONFIRM 时 才会执行登出操作
                if (type === "CONFIRM") {
                    //移出权限信息
                    axios.get('/user/signout').then(() => {
                        localStorage.removeItem('power');
                        location.href = `./login.html`;

                    }).catch(() => {
                        alert('系统繁忙');
                    })
                }

            }
        })
    })
    //检测是否登陆  每次进入首页都要验证
    axios.get('/user/login').then((data) => {
        if (data.code != 0) {
            alert('当前登陆不合发请重新登陆', {
                handled() {
                    location.href = './login.html';
                }
            })
        }
    });
    // //进来怎么执行 直接跳到员工列表页
    function initPage(n) {
        var ary = [
            './page/userlist.html',
            './page/useradd.html',
            './page/departmentlist.html',
            './page/departmentadd.html',
            './page/joblist.html',
            './page/jobadd.html',
            './page/customerlist.html',
            './page/customeradd.html'
        ]
        $iframe.attr('src', ary[n]);
    }
    // initPage(0);
    //权限分配

    function role() {
        //从本地获取权限信息
        let power = localStorage.getItem('power') || '';
        //userhandle|departhandle|jobhandle|departcustomer|allcustomer|resetpassword
        var str = `
                  ${
                       power.indexOf('userhandle')!==-1 ?
                ` <div class="itemBox">
                        <h3>
                            <i class="iconfont icon-yuangong"></i>
                            员工管理
                        </h3>
                        <nav class="item">
                            <a href="./page/userlist.html" target='iframeBox'>员工列表</a>
                            <a href="./page/useradd.html" target='iframeBox'>新增员工</a>
                        </nav>
                   </div>`:''
                 }
                 ${
                    power.indexOf('departhandle')!==-1?`
                    <div class="itemBox">
                            <h3>
                                <i class="iconfont icon-guanliyuan"></i>
                                部门管理
                            </h3>
                            <nav class="item">
                                <a href="./page/departmentlist.html" target='iframeBox'>部门列表</a>
                                <a href="./page/departmentadd.html" target='iframeBox'>新增部门</a>
                            </nav>
                     </div>`:''
                 }
                   ${
                    power.indexOf('jobhandle') !==-1 ?
                    `
                    <div class="itemBox">
                            <h3>
                                <i class="iconfont icon-zhiwuguanli"></i>
                                职务管理
                            </h3>
                            <nav class="item">
                                <a href="./page/joblist.html" target='iframeBox'>职务列表</a>
                                <a href="./page/jobadd.html" target='iframeBox'>新增职务</a>
                            </nav>
                        </div>
                    ` : ''
                   }
                    <div class="itemBox" style='display:none'>
                        <h3>
                            <i class="iconfont icon-kehuguanli"></i>
                            客户管理
                        </h3>
                        <nav class="item">
                            <a href="./page/customerlist.html#my" target='iframeBox'>我的客户</a>
                            ${
                                power.indexOf('allcustomer')!==-1 ?
                                `
                                <a href="./page/customerlist.html?_='aaa'#all" target='iframeBox'>全部客户</a>
                                ` : ''
                            }
                            ${
                                power.indexOf('departcustomer')!==-1 ?
                                `
                                <a href="./page/customeradd.html" target='iframeBox'>新增客户</a>
                                ` : ''
                            }
                        </nav>
                    </div>
                    `;
        $menuBox.html(str);
    }
    role();

    //渲染完成之后再去更新变量

    //监听hash的改变  去判断显示客户管理还是组织结构
    function initHash() {
        let $tar = $menuBox.find('.itemBox:last-child');
        if (location.hash === '#customer') {
            //当前要展示客户管理
            $tar.show().siblings('.itemBox').hide();
            let customerUrl = sessionStorage.getItem('customerUrl');
            if(customerUrl){
                $iframe.attr('src', customerUrl);
            }else{
                let tarurl = $tar.find('.item a').eq(0).attr('href');
                // console.log(tarUrl);
                $iframe.attr('src', tarurl);
            }
        
        } else {
            $tar.hide().siblings('.itemBox').show();
            //  url= $as.eq(0).attr('href');
            $as = $menuBox.find('a');
            let currentUrl = sessionStorage.getItem('currentUrl');
            if (currentUrl) {

                $iframe.attr('src', currentUrl);
            } else {
                let url = $as.eq(0).attr('href');
                $iframe.attr('src', url);

            }

        }
    }
    initHash();
    window.addEventListener('hashchange', initHash);
    //实现导航栏的折叠效果
    function foldFn() {
        let $h3s = $('.itemBox h3');
        $h3s.on('click', function () {
            $(this).siblings('.item').slideToggle('fast')
        })
    };
    foldFn();



})