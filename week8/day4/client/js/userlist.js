$(function () {
      //将当前操作的导航存入sessionStorage中
      sessionStorage.setItem('currentUrl','./page/userlist.html');
    let $tbody = $('.tableBox tbody'),
        $deleteAll = $('.deleteAll'),
        $selectAll = $('.tableBox thead .w3'),
        $handle = $('.tableBox thead  .w12'),
        $selectItems = null,
        $deleteBtns = null,
        $resetBtns = null,
        $selcetBox = $('.selectBox'),
        $searchInp = $('.searchInp');
        // $deleteAll=$('.deleteAll');
    let canshow = true;

    function role() {
        //按照 resetpassword 进行判断
        let power = localStorage.getItem('power');
        if (power.indexOf('resetpassword') === -1) {
            canshow = false;
            $deleteAll.hide();
            $selectAll.hide();
            $handle.hide();
        }
    }
    role();

    function getDate(options) {
        //optoions 是传进来的搜素条件 
        axios.get("/user/list", {
            params: options
        }).then((data) => {
            // console.log(data);
            render(data.data);
            $selectItems = $('.tableBox tbody input[type=checkbox]');
            evenBild(); //数据完成之后再去绑定事件
        }).catch(() => {
            // console.log(err);

            alert("系统繁忙");
        })
    }

    function render(data = []) {
        let str = '';
        data.forEach(item => {
            let {
                id,
                name = '',
                sex = '',
                email = '',
                phone = '',
                department = '',
                jobId = '',
                job = '',
                desc = ''
            } = item;
            str += `
            <tr>
            ${
                canshow ?
                 `
                 <td class="w3"><input type="checkbox"></td>
                 `:''
            }
            <td class="w10">${name}</td>
            <td class="w5">${sex==0 ?'男':'女'}</td>
            <td class="w10">${department}</td>
            <td class="w10">${job}</td>
            <td class="w15">${email}</td>
            <td class="w15">${phone}</td>
            <td class="w20">${desc}</td>
            ${
                canshow ?
                `
                <td class="w12 btnBox">
                <a href="./useradd.html?id=${id}"  data-id=${id} >编辑</a>
                <a href="javascript:;" data-id=${id}>删除</a>
                <a href="./reset.html?id=${id}" data-id=${id} >重置密码</a>
            </td>
                `:''
            }
         </tr>
        `
        });
        $tbody.html(str);

    }
    getDate();
    //实现全选功能
    $selectAll.find('input').on('change', function (e) {
        // console.log(this.checked);
        // $selectItems.attr('checked',this.checked);
        $selectItems.get().forEach(item => {
            item.checked = this.checked;
        })

    });

    function evenBild() {
        //给所有的删除按钮 和重置按钮 绑定点击事件
        $deleteBtns = $('.tableBox tbody .btnBox a:nth-child(2)');
        $resetBtns = $('.tableBox tbody .btnBox a:nth-child(3)');
        // console.log($deleteBtns);

        $deleteBtns.on('click', function () {
            let ele = this;
            alert('确定要删除吗?', {
                confirm: true,
                handled(type) {
                    if (type === 'CONFIRM') {
                        //1.怎么告诉后端对于的ID
                        //2.删除之后 前端怎么移出这一条
                        deleteFn($(ele).attr('data-id'));
                    }
                }
            })

        })
        $resetBtns.on('click', function () {

        });

    }

    function deleteFn(id) {
        axios.get('/user/delete', {
            params: {
                userId: id
            }
        }).then(data => {
            if (data.code == 0) {


            }
        })
    }
    //获取下拉列表要展示的内容
    function initSelect() {
        axios.get('/department/list').then(data => {
            if (data.code == 0) {
                let str = '	<option value="0">全部</option>';
                data.data.forEach(item => {
                    str += `
                    <option value="${item.id}">${item.name}</option>
                    `
                })
                $selcetBox.html(str);
            }
        }).catch(err => {
            console.log("系统繁忙");

        })
    }
    initSelect();
    //选中下拉框内容触发的函数
    $selcetBox.on('change', function () {
        console.log(this.value);
        getDate({
            departmentId: this.value
        })
    })
    $searchInp.on('keydown', function (e) {
        if (e.keyCode === 13) {
            getDate({
                departmentId: $selcetBox[0].value,
                search: this.value
            })
            this.value = '';
        }


    })

    //实现批量删除
     function batchDelete(){
         let items=$('tbody tr').get().filter(item=>{
             //返回true就把当前项放到新数组中
             return $(item).find('input[type="checkbox"]')[0].checked
         })
         //items 中就是存放的就是选中的那几个tr
         let ary=[];
         items.forEach(item=>{
             let id=$(item).find("a:nth-child(2)").attr('data-id');
               let p=axios.get('/user/delete?userId='+id);
               ary.push(p);
            })
         axios.all(ary).then(data=>{
                  console.log(data);
                //   debugger
                  
         }).catch(err=>{

         })
     }
     $deleteAll.on('click',function(){
        batchDelete();
     })

})