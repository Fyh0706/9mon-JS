$(function () {
     //将当前操作的导航存入sessionStorage中
    sessionStorage.setItem('currentUrl','./page/departmentlist.html')
    let id = location.href.queryURLParams().departmentId;
    let $inp = $('input'),
        $textA = $('textarea'),
        $submit = $('.submit');
    if (id) {
        //编辑状态
        axios.get('/department/info?departmentId=' + id).then(data => {
            $inp.val(data.data.name);
            $textA.val(data.data.desc);

            
        })
    } 
    $submit.on('click', function () {
        let url = id ? '/department/update' : '/department/add';
        let obj = {};
        id ? obj.departmentId = id : null;
        let name=$inp.val(),
            desc=$textA.val();
            if(!name){
               alert('部门名称不能为空');
               return
            }
        let options={
            name,
            desc
        }
        axios.post(url,Object.assign(options,obj))
    })
})