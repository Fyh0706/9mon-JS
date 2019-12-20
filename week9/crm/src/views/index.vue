<template>
  <div>
    <el-container>
      <el-header class="cl">
        <h2 class="lt">CRM客户管理系统</h2>
        <div class="topTabBox lt">
          <div class="lt">
            <router-link to="/org" tag="span">组织结构</router-link>
          </div>
          <div class="lt">
            <router-link to="/crm" tag="span">客户管理</router-link>
          </div>
        </div>
        <div class="userNameBox rt">
          <span>您好，珠峰培训</span>
          <span @click='signout'>安全退出</span>
        </div>
      </el-header>
      <div class="middle_content_box">
        <router-view></router-view>
      </div>
      <el-footer class="footer_bottom">Footer</el-footer>
    </el-container>
  </div>
</template>
<script>
// @ is an alias to /src
//在该组件验证登陆
import {signout,judgeLogin} from '@/api/login.js'
export default {
  name: "index",
  data() {
    return {};
  },
  created() {
    judgeLogin().then(flag=>{
      if(!flag){//若干flag是false 代表登陆状态是失败的直接跳转到登录页
        this.$router.push('/login')
      }
    })
  },
  methods: {
    signout(){
      signout().then(data=>{
        if(data.code==0){
          this.$router.push('/login');
          localStorage.removeItem('power')
        }
      })
    }
    
  },
  components: {}
};
</script>
<style lang="less">
.topTabBox {
  padding: 0 60px;
  > div {
    margin: 0 20px;
    cursor: pointer;
    box-sizing: border-box;
    &:hover {
      color: #fff;
      &::after {
        content: "";
        display: block;
        width: 100%;
        position: relative;
        top: -5px;
        border-bottom: 5px solid rgb(10, 182, 212);
      }
    }
    > span {
      display: block;
      width: 100%;
      height: 100%;
    }
    > span.router-link-active {
      font-size: 20px;
    }
  }
}
.userNameBox {
  > span:nth-child(2) {
    cursor: pointer;
    padding-left: 20px;
  }
}
.middle_content_box{
  position: absolute;
  top:60px;
  bottom: 60px;
  width: 100%;
  left: 0;
  overflow: hidden;
  .el-container{
     height: 100%;
  }
}
.footer_bottom{
  position: absolute;
  width: 100%;
  bottom: 0;
}
.el-header,
.el-footer {
  background-color: black;
  color: #ccc;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #d3dce6;
  color: rgb(11, 175, 240);
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 160px;
}

body > .el-container {
 
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>