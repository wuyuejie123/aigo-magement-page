<template>
  <div class="app-container">
    <el-table
        :data="deviceList"
        style="width: 100%"
        :row-class-name="tableRowClassName">
      <el-table-column prop="deviceId" label="编号" width="180"></el-table-column>

      <el-table-column prop="deviceKind" label="设备种类" width="180"></el-table-column>

      <el-table-column prop="deviceNum" label="设备数量" width="180"></el-table-column>

      <el-table-column prop="deviceStatus" label="状态"></el-table-column>

      <el-table-column prop="createdBy" label="管理者"></el-table-column>

      <el-table-column prop="createdTime" label="创建时间"></el-table-column>

      <el-table-column  label="操作">
        <el-button type="primary" plain size="mini" >管控</el-button>
      </el-table-column>

    </el-table>
  </div>
</template>

<script>


import goodsList from "../list/cameraList";

export default {
  data() {
    return {
      listLoading: true,
      goodsList: [],
      deviceList: [],
      result:{}
    };
  },

  mounted() {
    const  axios =require('axios');
    axios.get('http://localhost:22222/pjgo/deviceinfo/list').then(response=>{
      var myResponse=response.data;
      console.log(myResponse.page.list);
     this.deviceList=myResponse.page.list;
     this.result=myResponse;
     console.log(this.deviceList);
    }).catch(error=>{
      console.log(error);
    }).then(()=> {});



  },
  methods: {
    tableRowClassName({row, rowIndex}) {
      if (rowIndex === 1) {
        return 'warning-row';
      } else if (rowIndex === 3) {
        return 'success-row';
      }
      return '';
    }
  },
};
</script>

<style>
.el-table .warning-row {
  background: oldlace;
}

.el-table .success-row {
  background: #f0f9eb;
}

</style>
