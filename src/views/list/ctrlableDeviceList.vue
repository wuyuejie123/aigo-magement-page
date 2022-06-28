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
          title="可控设备"
          :visible.sync="dialogVisible"
          width="20%"
          :before-close="handleClose">

      <div class="dialogDiv">
        <table style="width: 100%;height: 100%">
          <tr>
            <td>编号:</td>
            <td><span>{{this.rowValue.ctrlableId}}</span></td>
          </tr>
          <tr>
            <td>名称：</td>
            <td><span>{{this.rowValue.ctrlableName}}</span></td>
          </tr>
          <tr>
            <td>运行状态</td>
            <td><span>{{this.rowValue.ctrlableStatus}}</span></td>
          </tr>
          <tr>
            <td>安装时间</td>
            <td><span>{{this.rowValue|formatDate}}</span></td>
          </tr>
          <tr>
            <td>运行时间：</td>
            <td><span>{{new Date().getDate()}}</span></td>
          </tr>
          <tr>
            <td>设备开关</td>
            <td>
              <el-switch
                  v-model="value"
                  active-value=""
                  active-color="#13ce66"
                  inactive-color="#ff4949">
              </el-switch>
            </td>
          </tr>
        </table>
      </div>

      </el-dialog>
      <!--  控制对话框结束   -->
      <template >
        <el-table
            :data="cameraList" style="width: 100%">
          <el-table-column prop="ctrlableId" label="编号"  ></el-table-column>
          <el-table-column prop="ctrlableName" label="名称"  ></el-table-column>
          <el-table-column prop="ctrlableStatus" label="运行状态"  ></el-table-column>
          <el-table-column  label="安装时间"  >
            <template slot-scope="props">
              <span>{{props.row.createTime|formatDate}}</span>
            </template>
          </el-table-column>
          <el-table-column  label="操作"  >
            <template slot-scope="props">
            <el-button type="text" @click="dialogVisible = true,getRowValue(props.row)">点击操作</el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>

    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: true,
      rowValue: {},
      listLoading: true,
       cameraList:[],
      result:{},
      dialogVisible: false

    };
  },

  methods: {
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
    axios.get("http://localhost:22222/pjgo/devicectrlable/list").then(result=>{
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
