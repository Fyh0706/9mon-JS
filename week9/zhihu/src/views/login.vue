<template>
  <div class="loginBox">
    <header class="cl">
      <div class="lt" @click="close">X</div>
      <div class="rt">免密码登陆</div>
    </header>
    <h2>密码登陆</h2>
    <section class="inpBox">
      <input type="text" placeholder="请输入用户名或手机号" v-model="name" />
      <input type="password" placeholder="请输入密码" v-model="psw" />
    </section>
    <div class="loginBtn" @click="login">登陆</div>
    <div class="cl hepl">
      <div class="lt">海外手机号登陆</div>
      <div class="rt">需要帮助</div>
    </div>
    <div class="otherLogin">
      <div>微信</div>
      <div>QQ</div>
      <div>新浪</div>
    </div>
  </div>
</template>
<script>
// @ is an alias to /src
import { login } from "@/api/login.js";
export default {
  name: "login",
  data() {
    return {
      name: "",
      psw: ""
    };
  },
  methods: {
    close() {
      //点击关闭按钮回到原来的页面
      this.$router.back();
    },
    login() {
      if (!this.name || !this.psw) {
        alert("用户名密码不能为空");
        return;
      }
      login({
        name: this.name,
        password: this.psw
      })
        .then(data => {
          //登陆成功之后  我们要把后台给的token 存储到localStorage中
          console.log(data);
          localStorage.setItem("token", "21345y43ewnfrasgfn");
          this.$store.commit("stateChange", { loginState: true });
          //   this.$router.back(); 返回上一个路由
          this.$router.push("/home");
        })
        .catch(err => {
          console.log(err);
          localStorage.setItem("token", "21345y43ewnfrasgfn");
          this.$store.commit("stateChange", { loginState: true });
          //   this.$router.back();
          this.$router.push("/home");
        });
    }
  },
  components: {}
};
</script>
<style lang="less" scoped>
.loginBox {
  padding: 5vw;

  > h2 {
    height: 30vw;
    line-height: 30vw;
    width: 90vw;
    text-align: center;
  }
  .inpBox {
    width: 80vw;
    margin: 5vw auto;
    input {
      border: none;
      display: block;
      outline: none;
      width: 100%;
      height: 15vw;
      font-size: 5vw;
      text-indent: 5vw;
      border-bottom: 1px solid #eee;
    }
  }
  .loginBtn {
    width: 80vw;
    height: 15vw;
    line-height: 15vw;
    margin: 10vw auto;
    background: rgb(9, 207, 174);
    color: #fff;
    font-size: 7vw;
  }
  .help {
    width: 80vw;
    margin: 10vw auto;
  }
  .otherLogin {
    width: 80vw;
    display: flex;
    margin: auto;
    position: fixed;
    bottom: 10vw;
    left: 10vw;
    > div {
      flex: 1;
    }
  }
}
</style>