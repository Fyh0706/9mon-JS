<template>
  <div>
    <my-header></my-header>
    <van-tabs class="top_tab" line-width="35px" color="#333" v-model="active" swipeable animated @change="change">
      <van-tab v-for="item in ary" :title="item.til" :key="item.to">
        <router-view></router-view>
      </van-tab>
    </van-tabs>
  </div>
</template>
<script>
// @ is an alias to /src
import Header from "./header";
export default {
  name: "home",
  data() {
    return {
    //   active: 1,
      ary: [
        { til: "关注", to: "/home/focus" },
        { til: "推荐", to: "/home/recommend" },
        { til: "热榜", to: "/home/hot" }
      ]
    };
  },
  computed: {
      active:{
          get(){
               return this.ary.findIndex(item=>item.to===this.$route.path)
          },
          set(){

          }
      }
  },
  components: {
    "my-header": Header
  },
  methods: {
    change(n) {
      this.$router.push(this.ary[n].to);
    }
  },

//   watch: {
//     $route(to) {
//       //侦听路由的变化 第一次进来监听不到
//       console.log(to);
//       this.ary.forEach((item, index) => {
//         if (item.to == to.path) this.active = index;
//       });
//     }
//   }
};
</script>
<style lang="less">
 .top_tab>.van-tabs__wrap {
 box-shadow: 0px 4px 4px 0px #eee; 
}
.van-tabs__wrap::after {
  border: none;
}
</style>