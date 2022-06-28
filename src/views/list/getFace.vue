<template>
  <div class="app-container">
    <el-card>
      <!-- 头部 begin -->
      <div slot="header" class="app-card-header">
        <div class="left">
          <span class="header-title">采集信息</span>
        </div>
        <div class="right">
          <el-button @click="drawer = true" type="primary" style="margin-left: 16px;">
            进行采集
          </el-button>
        </div>
      </div>
      <el-table
          :data="fileInfoList"
          style="width: 100%">
        <el-table-column
            prop="fid"
            label="编号"
            width="180">
        </el-table-column>
        <el-table-column
            prop="nid"
            label="人像编号"
            width="180">
        </el-table-column>
        <el-table-column
            prop="size"
            label="文件字节"
            width="180">
        </el-table-column>
        <el-table-column
            label="采集时间">
          <template slot-scope="props">
            <span>{{props.row.createtime|formatDate}}</span>
          </template>
        </el-table-column>
        <el-table-column
            label="改变时间">
          <template slot-scope="props">
            <span>{{props.row.updatetime|formatDate}}</span>
          </template>
        </el-table-column>
      </el-table>



    </el-card>
    <el-drawer
        size="70%"
        title="我是标题"
        :visible.sync="drawer"
        :direction="direction"
        :before-close="handleClose">
      <div id="app">
        <div id="content">
          <WebRTCFaceRecognition></WebRTCFaceRecognition>
        </div>
      </div>
    </el-drawer>


  </div>

</template>

<script>
import WebRTCFaceRecognition from "./face/WebRTCFaceRecognition";
import axios from "axios";

export default {
  components: {
    WebRTCFaceRecognition
  },
  data() {
    return {
      drawer: false,
      direction: 'rtl',
      fileInfoList: []

    };
  },
    mounted() {
      axios.get("http://localhost:11331/api/face.1.0/facesuccimg/list")
          .then(success=>{
            this.fileInfoList=success.data.page.list;

          })
          .catch()
    },

  methods: {

      handleClose(done) {
        this.$confirm('确认关闭？')
            .then(_ => {
              done();
            })
            .catch(_ => {});
      }
    }


}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  display: flex;
  flex-direction: row;
  color: #2c3e50;
}

#nav {
  min-width: 200px;
  border: 2px #42b983 solid;
  padding: 10px;
  margin-right: 20px;
}

#nav ul,
#nav li {
  list-style: none;
  margin: 10px 0;
  padding: 0;
  line-height: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

#content {
  flex-grow: 1;
  border: 2px #42b983 solid;
  padding: 20px;
}
</style>
