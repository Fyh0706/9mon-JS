<template>
  <div style="height:100%">
    <el-table :data="tableData" style="width: 100% " stripe border height="100%">
      <el-table-column label="编号" type="index" width="150" align="center" :index="indexMethod"></el-table-column>
      <el-table-column label="职务 " width="150" align="center">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.name}}</span>
        </template>
      </el-table-column>
      <el-table-column label="描述" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.desc}}</span>
        </template>
      </el-table-column>
      <el-table-column label="权限" width="350" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.power|trans}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="200" align="center">
        <template slot-scope="scope">
          <el-button size="mini" type="danger" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
// @ is an alias to /src
export default {
  name: "index",
  data() {
    return {};
  },
  computed: {
    tableData() {
      return this.$store.state.jobList;
    }
  },
  created() {
    this.$store.dispatch("changeJobList");
  },
  methods: {
    handleEdit(index, row) {
       console.log(index, row);
      // this.$router.push('/org/addDepartment')
      //跳转时  要带上id  根据id 那数据
      this.$router.push({path:'/org/addJob',query:{id:row.id}})
    },
    handleDelete(index, row) {
     
    },
    indexMethod(index) {
      return index + 1;
    }
  },
  components: {}
};
</script>
<style lang="less">
</style>