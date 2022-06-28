<template>
  <div class="app-container">
    <el-card>
      <!-- 头部 begin -->
      <div slot="header" class="app-card-header">
        <div class="left">
          <span class="header-title">传感器</span>
        </div>
        <div class="right">
          <el-button size="small" icon="el-icon-plus" type="primary">新增</el-button>
        </div>
      </div>
      <!--  控制对话框   -->
      <el-dialog
          title="传感器"
          :visible.sync="dialogVisible"
          width="20%"
          :before-close="handleClose">

        <div class="dialogDiv">
          <table style="width: 100%;height: 100%">
            <tr>
              <td>编号:</td>
              <td><span>{{this.rowValue.sensorId}}</span></td>
            </tr>
            <tr>
              <td>名称：</td>
              <td><span>{{this.rowValue.sensorName}}</span></td>
            </tr>
            <tr>
              <td>运行状态</td>
              <td><span >{{this.sensorStatus? "开启":"关闭"}}</span></td>
            </tr>
            <tr>
              <td>安装时间</td>
              <td><span>{{this.rowValue.updateTime|formatDate}}</span></td>
            </tr>
            <tr>
              <td>运行时间：</td>
              <td><span>{{new Date().getDate()}}</span></td>
            </tr>
            <tr>
              <td>设备开关</td>
              <td>
                <el-switch
                    @change="switchChange"
                    v-model="value"
                    active-value=""
                    active-color="#ff4949"
                    inactive-color="#13ce66">

                </el-switch>
              </td>
            </tr>
          </table>
        </div>

      </el-dialog>
      <!--  控制对话框结束   -->

        <el-table
            :data="cameraList" style="width: 100%">

          <el-table-column prop="sensorId" label="编号" ></el-table-column>
          <el-table-column prop="sensorName" label="名称" ></el-table-column>
          <el-table-column  label="设备状态" >
            <template>
              <span style="color: greenyellow">{{this.sensorStatus? "正常":"正常"}}</span>
            </template>
          </el-table-column>


          <el-table-column  label="安装时间" >
            <template slot-scope="props">
            <span>{{props.row.updateTime|formatDate}}</span>
            </template>
          </el-table-column>

          <el-table-column  label="操作" width="180">
            <template slot-scope="props">
            <el-button type="text" @click="dialogVisible = true,getRowValue(props.row)">点击操作</el-button>
            </template>
          </el-table-column>

        </el-table>


    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      sensorStatus: false,
      value: true,
      dialogVisible: false,
      rowValue: {},
      listLoading: true,
      cameraList:[],
      result:{}

    };
  },

  methods: {
    switchChange(){
    this.sensorStatus=!this.sensorStatus
      console.log(this.sensorStatus)
    },
    getRowValue(value){
      this.rowValue=value;
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
    }
},
  mounted() {
    const axios=require('axios');
    axios.get("http://localhost:22222/pjgo/devicesensor/list").then(result=>{
      const response= result.data;
      this.cameraList=response.page.list;
      this.result=response;
    }).catch(error=>{

        }).then(()=>{

    });
  }
};
</script>

<style>
.dialogDiv{
  height: 40vh;
}
</style>
