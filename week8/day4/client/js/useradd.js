$(function () {
  //将当前操作的导航存入sessionStorage中
  sessionStorage.setItem('currentUrl','./page/userlist.html');

    let $username = $('.username'),
        $man = $('#man'),
        $woman = $('#woman'),
        $useremail = $('.useremail'),
        $userphone = $('.userphone'),
        $userdepartment = $('.userdepartment'),
        $userjob = $('.userjob'),
        $userdesc = $('.userdesc'),
        $submit = $('.submit');

    let id = location.href.queryURLParams().id;

    // console.log(id);

    if (id!==undefined) {
        //是编辑状态
        axios.get('/user/info?userId=' + id).then(data => {
            if (data.code == 0) {
                let {
                    name,
                    sex,
                    email,
                    phone,
                    departmentId,
                    department,
                    jobId,
                    desc
                } = data.data;
                $username.val(name);
                sex == 0 ? $man.attr('checked', true) : $woman.attr('checked', true);
                $useremail.val(email);
                $userphone.val(phone);
                $userdesc.val(desc);
                //初始化 部门列表
                initSelect('/department/list', $userdepartment, departmentId);
                //初始化   职务列表
                initSelect('/job/list', $userjob, jobId);

            } else {
                alert('系统繁忙');
            }
        })
    } else {
        //初始化 部门列表
        initSelect('/department/list', $userdepartment, 1);
        //初始化   职务列表
        initSelect('/job/list', $userjob, 1);
    }

    function initSelect(url, $ele, id) {
        //初始化 部门列表  职务列表
        axios.get(url).then(data => {
            let str = '';
            let ary = data.data || [];
            ary.forEach(item => {
                str += `
                       <option value="${item.id}">${item.name}</option>  
                `
            });
            $ele.html(str);
            $ele.val(id);
        }).catch(err => {
            attr('系统繁忙');
        })
    }
     
    $submit.on('click', function () {
        console.log(id);
        
        //执行判断之前 判断必填输入框是否为空
        let name = $username.val(),
            sex = $man[0].checked ? 0 : 1, //男被选中就是男的 没有就是女的
            email = $useremail.val(),
            phone = $userphone.val(),
            departmentId = $userdepartment.val(),
            jobId = $userjob.val(),
            desc = $userdesc.val();
        if (name && email && phone && departmentId && jobId) {
            let obj = {};
            id ? obj.userId = id : null;
            let option = {
                name,
                sex,
                email,
                phone,
                departmentId,
                jobId,
                desc
            }
            //新增是add   更新是updete
            let url = id ? '/user/update' : '/user/add'
            axios.post(url, Object.assign(option, obj));
            // lodash;   let o = assign(a,b); 把对象b合并到a中；返回值是合并之后的 a;o===a
        } else {
            alert('必填项不能为空')
        }

    })

})