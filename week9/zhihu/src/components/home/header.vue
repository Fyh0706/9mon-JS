<template>
  <div class="headerBox">
    <div>
      <van-icon class="lt" name="tv-o" />
      <van-search v-model="value" placeholder="请输入搜索关键词" />
      <van-icon class="rt" name="calender-o" />
    </div>
  </div>

</template>
<script>
// @ is an alias to /src
export default {
  name: "myheader",
  data() {
    return {
      value: "",
      active:0,
    };
  },
  components: {}
};
</script>
<style lang="less">
.headerBox {
  > div {
    display: flex;
    align-items: center;
    > .lt,
    > .rt {
      width: 15vw;
      text-align: right;
      font-size: 8vw;
    }
    > .rt {
      text-align: left;
    }
    > div {
      flex: auto;
      padding: 6vw;
    }
  }
}
</style>