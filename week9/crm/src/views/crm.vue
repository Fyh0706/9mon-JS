<template>
    <el-container>
      <my-nav :ary="ary"></my-nav>
        <el-main>
            <router-view></router-view>
        </el-main>
      </el-container>
</template>
<script>
// @ is an alias to /src
import nav from "@/components/nav";
import ary from '@/router/customer.js'
export default {
    data() {
        return {
         ary:ary
        }
    },
    // created() {
    //     console.log(this.ary)
    // },
    components: {
        'my-nav':nav
    }
}
</script>
<style lang="less">

</style>