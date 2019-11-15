$(function () {
    //将当前操作的导航存入sessionStorage中
    sessionStorage.setItem('currentUrl','./page/departmentlist.html')

    //获取数据  展示列表    ：权限判断 展示不展示 操作权 点击对应的按钮  点击编辑 带着id跳到添加页  点击删除 弹出警示框  然后在做是否删除的操作
    let $tbody = $('.tableBox tbody');
    let power = localStorage.getItem('power');
    //setItem 的第二个参数必须是字符串
    let $thead = $('.tableBox thead');
    let canShow = power.includes('resetpassword');


    // console.log($del);

    //权限判断
    if (!canShow) {
        $('.btnBox').hide()
    };

    function getData() {
        axios.get('/department/list').then(data => {
            if (data.code == 0) {
                render(data.data)
            } else {
                console.log("系统繁忙");
            }
        })

    }

    function render(data = []) {
        let str = '';
        data.forEach(item => {
            let {
                id,
                name,
                desc
            } = item;
            str += `<tr>
                       <td class="w10">${id}</td>
                       <td class="w20">${name}</td>
                       <td class="w40">${desc}</td>
                      ${
                          canShow ?` 
                            <td class="w20">
                            <a href="./departmentadd.html?departmentId=${id}">编辑</a>
                            <a href="javascript:;" class ='del' departmentId=${id}>删除</a>
                            </td>`
                            :
                            ``
                        }
                   </tr>
            `
        });
        $tbody.html(str);

        eventBind();


    }
    getData();

    function del(id) {
        axios.get('/department/delete?departmentId=' + id).then(data => {
            console.log(111);

        })
    }

    function eventBind() {
        $('.tableBox tbody .del').on('click', function () {
            let id = $(this).attr('departmentId');
            alert('确定要删除吗?', {
                title: '警告',
                confirm: true,
                handled(type) {
                    if (type == 'CONFIRM') {
                        //确定删除
                        del(id);
                    }
                }
            })
        })
    }


})