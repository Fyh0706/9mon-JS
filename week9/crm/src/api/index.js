import http from './http'
//请求部门列表数据
export function getDpList() {
    return http.get('/department/list')
}

//删除部门列表中的数据
export function delDpList(departmentId) {
    return http.get('/department/delete', {
        params: { departmentId }
    })
}
//新增部门接口
export function addDplist(option){
 return http.post('/department/add',option)
}
//修改部门接口
export function upDpList(option) {
    return http.post('/department/update',option)
}
 //获取用户列表接口
 export function getUserList(option){
     //option  {departmentId:0,search:''}
     return http.get('/user/list',{
         params:option
     })
 }
 //新增用户列表接口
 export function addUserList(option){
  return http.post('/user/add',option)
 }
 //更新用户列表接口
 export function upUserList(option){
     return http.post('/user/update',option)
 }
 //删除用户列表接口

 export function delUserList(userId){
     return http.get('/user/delete',{
         params:{userId}
     })
 }
 //获取职务列表接口
 export function getJobList(){
     return http.get('/job/list')
 }




