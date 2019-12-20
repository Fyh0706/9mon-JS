<template>
  <el-form ref="form" :rules="rules" :model="form" label-width="100px" class="myform">
    <el-form-item label="部门名称" prop="name">
      <el-input v-model.trim="form.name" style="width:400px" autofocus></el-input>
    </el-form-item>
    <el-form-item label="部门描述" prop="desc">
      <el-input type="textarea" v-model.trim="form.desc" style="width:400px" rows="6"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">立即创建</el-button>
      <el-button @click="$router.back()">取消</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
import { addDplist, upDpList } from "@/api/index.js";
export default {
  data() {
    return {
      form: {
        name: "",
        desc: ""
      }
    };
  },
  created() {
    let id = this.$route.query.id;
    let obj = this.$store.state.departmentList.filter(item => item.id == id)[0];
    console.log(obj);
    this.form = obj ? obj : this.form;
  },
  methods: {
    onSubmit() {
      //   console.log("submit!", this.form);
      this.$refs.form.validate(flag => {
        //flag 是true 代表刚才验证规则都通过了
        if (flag) {
          let id = this.$route.query.id;
          this.form.departmentId = id; //后台需要的参数
          (id ? upDpList : addDplist)(this.form)
            .then(data => {
              if (data.code == 0) {
                this.$confirm((id ? "更新" : "添加") + "成功！", "提示", {
                  confirmButtonText: "确定",
                  cancelButtonText: "取消",
                  type: "success"
                })
                  .then(() => {
                    this.$router.push("/org/department");
                  })
                  .catch(() => {});
              } else {
                this.$message({
                  type: "error",
                  message: "添加失败!"
                });
              }
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          this.$message({
            type: "error",
            message: "添加失败!"
          });
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
.myform {
  min-height: 100%;
  text-align: left;
  background: #fff;
  padding: 20px;
  box-sizing: border-box;
}
</style>