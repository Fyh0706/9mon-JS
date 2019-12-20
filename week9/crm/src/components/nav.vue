<template>
  <el-aside width="200px" style="background-color:#545c64;overflow: hidden">
    <div class="asidBox">
      <el-row class="tac">
        <el-col>
          <!-- :router='true' -->
          <el-menu default-active="2" class="el-menu-vertical-demo" background-color="#545c64">
            <el-submenu
              class="mycolor"
              v-for="(item,index) in menuList"
              :index="index+'1' "
              :key="index"
            >
              <template slot="title">
                <i :class="item[0].meta.icon"></i>
                <span>{{item[0].meta.rootTil}}</span>
              </template>
              <!-- :route='v.path' -->
              <router-link :to="v.path" v-for="(v,i) in item" tag="span" :key="index+'-'+i">
                <el-menu-item :index="(index+'1')+'-'+(i+'1')">{{v.meta.til}}</el-menu-item>
              </router-link>
            </el-submenu>
          </el-menu>
        </el-col>
      </el-row>
    </div>
  </el-aside>
</template>
<script>
// @ is an alias to /src
export default {
  name: "orgLeft",
  data() {
    return {
      menuList: [],
      power: localStorage.getItem("power")
    };
  },
  props: ["ary"],
  components: {},
  methods: {
    menuInit() {
      let t = [this.ary[0]];

      this.ary.reduce((prev, cur) => {
        if (prev.meta.type == cur.meta.type) {
          t.push(cur);
        } else {
          this.menuList.push(t);
          t = [cur];
        }
        return cur;
      });
      this.menuList.push(t);
      //权限校验
      this.menuList = this.menuList.filter(item => {
        // if(!this.power)return //若不存在数组为空
        return !this.power
          ? false
          : this.power.indexOf(item[0].meta.power) != -1;
        // return this.power.indexOf(item[0].meta.power)!=-1
      });
      //权限校验完成之后设置默认的跳转路径
      let url = this.menuList[0] && this.menuList[0][0].path;
      // if ( this.$route.path ) return;
      let ary = this.$route.path.split("/");
      if (ary.length > 2 && ary.pop().length > 0) {
       // 说明路径是在二级路径下，这时什么也不用做
        //ary.length>2 说明至少由两个 /
        // ary.pop().length>0 说明最后一项的长度不是0； 也就是第二个/后边有内容， 也就是当前是二级路径
      }else{
         this.$router.push(url);
      }
    }
  },
  created() {
    // console.log(this.ary);
    this.menuInit();
  }
};
</script>
<style lang="less" scoped>
.mycolor {
  span,
  li {
    color: #fff;
  }
}
.router-link-active {
  .el-menu-item {
    color: aqua;
  }
}
.asidBox {
  height: 100%;
  width: 110%;
  overflow-y: scroll;
}
</style>