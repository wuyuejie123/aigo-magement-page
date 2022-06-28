<template>
  <div class="app-container">
    <el-card>
      <!-- 头部 begin -->
      <div slot="header" class="app-card-header">
        <div class="left">
          <span class="header-title">服务记录</span>
        </div>
        <div class="right">
          <el-button size="small" icon="el-icon-plus" type="primary">新增</el-button>
        </div>
      </div>
      <!-- 头部 end -->

      <!-- 表格 begin -->
      <template>
        <el-table :data="serviceList" style="width: 100%">
          <el-table-column prop="serviceId" label="编号" ></el-table-column>
          <el-table-column prop="deviceKind" label="类型" ></el-table-column>
          <el-table-column prop="deviceName" label="详细设备" ></el-table-column>
          <el-table-column  label="服务人员" >zhangsan</el-table-column>
          <el-table-column  label="服务时间" >
            <template slot-scope="props">
              <span>{{props.row.serviceTime|formatDate}}</span>
            </template>

          </el-table-column>
          <el-table-column  label="操作" >
            <el-button type="primary" size="mini" plain>按钮</el-button>
          </el-table-column>
        </el-table>
      </template>

    </el-card>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      listLoading: true,
      serviceList:[],
      result:{}

    };
  },

  methods: {

},
  mounted() {
    const axios = require('axios');
    axios.get("http://localhost:22222/pjgo/deviceservice/list").then(result => {
      const response = result.data;
      this.serviceList = response.page.list;
      this.result = response;
    }).catch(error => {

    }).then(() => {

    });

  }
}
</script>

<style></style>
