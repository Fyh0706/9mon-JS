<template>
  <div class="uesr">
    <header>
      <input class="lt" type="text" placeholder="搜索知乎内容"/>
      <span class="sm">扫描</span>
      <span @click='change'>{{loginState?'退出':'登陆'}}</span>
    </header>
    <in v-if='loginState'></in>
      <no-in v-else></no-in>
  </div>
</template>
<script>
import { mapState } from "vuex";
import In from "./in";
import NoIn from "./noin";
// @ is an alias to /src
export default {
  name: "user",
  data() {
    return {};
  },
  components: {
    // In,NoIn
    in:In,
    'no-in':NoIn
  },
  computed: {
    ...mapState(["loginState"])
  },
  methods: {
    change(){
      if(this.loginState){
            //当前是登录 我们要登出
            localStorage.removeItem('token');
            this.$store.commit('stateChange',{'loginState':false})
      }else{
             //当前没有登陆  我们要登录
             this.$router.push('/login')
      }
    }
  },
};
</script>
<style lang="less" scoped>
  .uesr{
     header{
       padding:6vw 5vw;
      
       input{
          width:65vw;
          height: 8vw;
          font-size: 3vw;
          text-align: center; 
          border-radius: 2vw;
          border: 1px solid #cccccc ;
           outline: none     
       }
       span{
         font-size: 4vw;
         line-height: 9vw;
         margin-left:4vw;
       }
     }
  }
</style>