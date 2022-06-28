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


<!--  图片对话框    -->
      <el-dialog
          title="人像信息"
          :visible.sync="dialogVisible"
          width="30%"
          :before-close="handleClose">
        <div id="photoDialog">
          <div class="photoDialogSon top">
            <div class="topSon" v-viewer>
                <img :src="oneInfo.path" style="width: 100% ;height: 100%" >
            </div>
            <div class="topSon">
              <table style="margin-left: 10px;height: 100%" >
                <tr>
                  <td>编号:</td>
                  <td>{{this.oneInfo.nid}}</td>
                </tr>
                <tr>
                  <td>采集时间：</td>
                  <td>{{this.oneInfo.createtime|formatDate}}</td>
                </tr>
                <tr>
                  <td>种类：</td>
                  <td>人脸</td>
                </tr>
                <tr>
                  <td>人脸性别：</td>
                  <td>男性</td>
                </tr>
                <tr>
                  <td>采集设备：</td>
                  <td>1号摄像头</td>
                </tr>
              </table>

            </div>
          </div>
          <div class="photoDialogSon" style="display: flex;flex-direction: column">
            <div >
            <p style="color: red">人像特征值</p>
            </div>
            <div >

            </div>
            <textarea v-html="this.oneInfo.mess" style="height: 100%;width: 100%"></textarea>

          </div>
        </div>


      </el-dialog>
<!--   end   -->


      <div>
           <div >
             <span v-for="info in fileInfoList" >

                  <span  @click="dialogVisible = true,getMessage(info)" >

                  <img  :src="info.path" style="margin-right: 8px ;width: 15vw;height: 31vh" >

                   </span>



             </span>
        </div>

<!--        <viewer :images="images"  class="headImg">
&lt;!&ndash;          <img v-for="src in images" :key="src" :src="src">&ndash;&gt;
          <div id="gallery" class="media-gal">
            <div class="images item " >
&lt;!&ndash;              <a href="#myModal" data-toggle="modal">&ndash;&gt;

                  <span  @click="dialogVisible = true">
                  <img v-for="src in images" :key="src" :src="src">
                  </span>
&lt;!&ndash;              </a>&ndash;&gt;
&lt;!&ndash;              <p>img01.jpg </p>&ndash;&gt;
            </div>
          </div>
        </viewer>-->
        <!-- api -->
<!--        <button type="button" >Click to show</button>-->
      </div>



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
      oneInfo:{},
      dialogVisible: false,
      drawer: false,
      direction: 'rtl',
      fileInfoList: [],

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
    getMessage(info){
      this.oneInfo=info;
    },
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


#photoDialog{
    height: 60vh;

    display: flex;
    flex-direction: column;
}
.photoDialogSon{

  height: 50%;
}
.top{
  display: flex;
  flex-direction: row;
}
.topSon{

  width: 50%;
}
</style>
