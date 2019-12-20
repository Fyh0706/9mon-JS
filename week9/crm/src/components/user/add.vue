<template>
  <el-form ref="form" :model="form" label-width="80px" class="myform">
    <el-form-item label="姓名">
      <el-input v-model="form.name" style="width:350px"></el-input>
    </el-form-item>
    <el-form-item label="性别">
      <el-radio-group v-model="form.sex">
        <el-radio label="0">男</el-radio>
        <el-radio label="1">女</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="邮箱">
      <el-input v-model="form.email" style="width:350px"></el-input>
    </el-form-item>
    <el-form-item label="电话">
      <el-input v-model="form.phone" style="width:350px"></el-input>
    </el-form-item>
    <el-form-item label="部门">
      <el-select v-model="form.departmentId" placeholder="请选择部门">
        <el-option
          v-for="item in departmentList"
          :key="item.id"
          :label="item.name"
          :value="item.id+''"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="职务">
      <el-select v-model="form.jobId" placeholder="请选择职务">
        <el-option v-for="item in jobList" :key="item.id" :label="item.name" :value="item.id+''"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="自我介绍">
      <el-input type="textarea" v-model="form.desc" style="width:350px" rows="6"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">立即创建</el-button>
      <el-button>取消</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
import { addUserList, upUserList } from "@/api/index.js";
import { mapState } from "vuex";
export default {
  data() {
    return {
      form: {
        department: "",
        departmentId: "",
        desc: "",
        email: "",
        id: "",
        job: "",
        jobId: "",
        name: "",
        phone: "",
        sex: ""
      },
      value: ""
    };
  },
  computed: {
    // departmentList() {
    //   return this.$store.state.departmentList;
    // },
    // joboptions() {
    //   // console.log(this.$store.state.jobList);
    //   return this.$store.state.jobList;
    // }
    ...mapState(["departmentList", "jobList", "userList"])
  },
  created() {
    let id = this.$route.query.id;
    let obj = this.userList.filter(item => item.id == id)[0];
    // console.log(obj, this.form);
    this.form = obj || this.form;
    // this.form.departmentId *= 1;
    // this.form.jobId *= 1;
    if (!this.form.job) {
      this.form.jobId = "";
    }
  },
  methods: {
    onSubmit() {
      let id = this.$route.query.id;
      this.form.id = id ? id : Math.random();
      this.form.userId = this.form.id;
      (id ? upUserList : addUserList)(this.form).then(data => {
        if (data.code == 0) {
          this.$confirm((id ? "更新" : "添加") + "成功！", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "success"
          })
            .then(() => {
              this.$router.push("/org/user");
            })
            .catch(() => {});
        } else {
          this.$message({
            type: "error",
            message: "添加失败!"
          });
        }
      });
    },
    selectChange(val) {
      this.value = val;
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