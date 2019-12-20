<template>
  <div class="userBox">
    <div>
      <el-select :value="value" @change="selectChange" placeholder="请选择部门">
        <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id"></el-option>
      </el-select>
      <el-input
        placeholder="请输入内容"
        v-model="input4"
        @change="search"
        style="width:240px;margin-left:20px"
      >
        <i slot="prefix" class="el-input__icon el-icon-search"></i>
      </el-input>
    </div>
    <el-table
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
      border
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" align="center" width="55"></el-table-column>
      <el-table-column prop="name" align="center" label="姓名" width="80"></el-table-column>
      <el-table-column align="center" label="性别" width="50">
        <template slot-scope="scope">
          <span>{{scope.row.sex==0?'男':'女'}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="department" align="center" label="部门" width="80"></el-table-column>
      <el-table-column prop="job" align="center" label="职务" width="80"></el-table-column>
      <el-table-column prop="email" align="center" label="邮箱" width="200"></el-table-column>
      <el-table-column prop="phone" align="center" label="电话" width="120"></el-table-column>
      <el-table-column prop="desc" align="center" label="描述" width="200" show-overflow-tooltip></el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>

          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
// @ is an alias to /src
import { delUserList } from "@/api/index.js";
export default {
  data() {
    return {
      value: "",
      input4: ""
    };
  },
  created() {
    this.$store.dispatch("changeUserList");
  },
  computed: {
    options() {
      let ary = this.$store.state.departmentList;
      return [
        {
          id: 0,
          name: "全部"
        },
        ...ary
      ];
    },
    tableData() {
      return this.$store.state.userList;
    }
  },
  methods: {
    handleSelectionChange(val) {
      console.log(val);
    },
    handleEdit(index, row) {
      this.$router.push({ path: "/org/addUser", query: { id: row.id } });
    },
    handleDelete(index, row) {
      this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
           
          delUserList(row.id).then(data => {
            if (data.code == 0) {
              this.$message({
                type: "success",
                message: "删除成功!"
              });
              this.$store.dispatch("changeUserList"); //删除成功之后更新数据
            } else {
              this.$message({
                type: "error",
                message: "删除失败!"
              });
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    selectChange(val) {
      //   console.log(val);
      this.value = val;
      this.$store.dispatch("changeUserList", {
        departmentId: val,
        search: this.input4
      });
    },
    search(val) {
      this.$store.dispatch("changeUserList", {
        departmentId: this.value || 0,
        search: this.input4
      });
    }
  },
  components: {}
};
</script>
<style lang="less" scoped>
.userBox {
  text-align: right;
  padding: 20px;
  height: 100%;
  background: #fff;
  > div:nth-child(1) {
    padding-bottom: 20px;
  }
}
</style>