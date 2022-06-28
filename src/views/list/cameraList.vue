<template>
  <div class="app-container">
    <el-card>
      <!-- 头部 begin -->
      <div slot="header" class="app-card-header">
        <div class="left">
          <span class="header-title">摄像头</span>
        </div>
        <div class="right">
          <el-button size="small" icon="el-icon-plus" type="primary">新增</el-button>
        </div>
      </div>

<!--  操作对话框    -->
      <el-dialog title="摄像头" :visible.sync="outerVisible" width="40%" >
        <div class="optiondialog">
          <div class="optiondialog1">
<!--            <ul>
              <li>编号：</li>
              <li>名称：<span>{{this.rowValue.cameraName}}</span></li>
              <li>运行状态：<span>{{this.rowValue.cameraStatus}}</span></li>
              <li>位置：<span>{{this.rowValue.cameraLocation}}</span></li>
              <li>运行时间：<span>{{new Date()}}</span></li>
            </ul>-->
            <table style="width: 100%;height: 100%" >
              <tr>
                <td>编号：</td>
                <td><span>{{this.rowValue.cameraId}}</span></td>
              </tr>
              <tr>
                <td>名称：</td>
                <td><span>{{this.rowValue.cameraName}}</span></td>
              </tr>
              <tr>
                <td>运行状态：</td>
                <td><span>{{this.rowValue.cameraStatus}}</span></td>
              </tr>
              <tr>
                <td>位置：</td>
                <td><span>{{this.rowValue.cameraLocation}}</span></td>
              </tr>
              <tr>
                <td>运行时间：</td>
                <td><span>{{new Date().getDate()}}</span></td>
              </tr>

            </table>



<!--            </el-table>-->
          </div>
          <div class="optiondialog1" id="outer">
            <div class="inner">
              <div align="center">
              监控开关：
              <el-switch
                  v-model="value"
                  active-value=""
                  active-color="#13ce66"
                  inactive-color="#ff4949">
              </el-switch>
              </div>
            </div>
            <div class="inner">


              <div align="center">
                <el-button type="text" @click="innerVisible = true">查看监控</el-button>
              </div>

            </div>
          </div>
        </div>

        <el-dialog
            title="监控"
            :visible.sync="innerVisible"
            width="58%"

            :before-close="handleClose">
          <newVideo></newVideo>
          <span slot="footer" class="dialog-footer">

          </span>
        </el-dialog>

      </el-dialog>
      <!--  操作对话框结束    -->

      <template>

        <el-table
            :data="cameraList" style="width: 100vw">
          <el-table-column prop="cameraId" label="编号" ></el-table-column>
          <el-table-column prop="cameraName" label="摄像头" ></el-table-column>
          <el-table-column prop="cameraStatus" label="状态" ></el-table-column>
          <el-table-column prop="cameraLocation" label="所在位置" ></el-table-column>
          <el-table-column prop="createdBy" label="创建者" ></el-table-column>
          <el-table-column  label="操作">
<!--     @click="dialogVisible = true"       -->
<!--            <el-button type="primary" size="mini" plain >管控</el-button>-->
            <template slot-scope="props">
            <el-button type="text" @click="outerVisible = true,gerRowNuber(props.row)">点击操作</el-button>
            </template>
          </el-table-column>
        </el-table>

      </template>

    </el-card>
<!--  视频弹框  -->

  </div>
</template>

<script>
import getVideo from "../video/getVideo";
import newVideo from "../video/newVideo";
export default {
  components: {
    getVideo,
    newVideo
  },
  data() {
    return {
      rowValue:{},
      kaioguan:"正常",
      value: true,
      outerVisible: false,
      innerVisible: false,
      listLoading: true,
       cameraList:[],
      result:{},
      dialogVisible: false

    };
  },

  methods: {
    gerRowNuber(value){
      this.rowValue=value;
      console.log(this.rowValue)
    },
    handleChange(val) {
      console.log(val);
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
    axios.get("http://localhost:22222/pjgo/devicecamera/list").then(result=>{
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
.optiondialog{

  height: 300px;
  display: flex;
  flex-direction: row;
}
.optiondialog1{

  height: 100%;
  width: 50%;
}
#outer{
  display: flex;
  flex-direction: column;
}
.inner{
  height: 50%;
  width: 100%;

}


.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
</style>
