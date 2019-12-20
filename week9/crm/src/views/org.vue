<template>
  <el-container>
    <orgLeft :ary="ary"></orgLeft>
    <el-main class="my-main">
      <router-view></router-view>
    </el-main>
  </el-container>
</template>
<script>
// @ is an alias to /src
import ary from "@/router/org.js";
import orgLeft from "@/components/nav";
export default {
  data() {
    return {
      ary:ary
    };
  },
  components: {
    orgLeft
  },
  methods: {}
};
</script>
<style lang="less" scoped>
.my-main{
  padding: 0;
  line-height: normal;
}
</style>