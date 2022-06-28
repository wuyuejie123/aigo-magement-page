<template>
<div id="main" class="app-container">
  <div id="top">
    <div id="title">
      <h1 style="text-align: center">aigo全局概览</h1>
    </div>
    <div id="menu">
<!--      <div class="menu">-->

<!--        <el-card class="box-card  ">-->
<!--          摄像头-->
<!--        <span class="glyphicon glyphicon-camera"></span>-->
<!--        </el-card>-->
      <div class="jichu filecolor menu">
        <div class="wenzi">

        </div>


        <a href="filemanage" class="moreduo"> 更多 <span
            class="glyphicon glyphicon-circle-arrow-right"></span>
        </a>
      </div>
<!--      </div>-->

        <el-card class="box-card menu" >
          传感器

        </el-card>


        <el-card class="box-card menu">
          服务记录

        </el-card>

        <el-card class="box-card menu">
          服务记录

        </el-card>

        <el-card class="box-card menu">
          管理员
        </el-card>
      </div>

  </div>
  <div id="bottom">
    <div id="b_left" class="bson">

    </div>
    <div id="b_center" class="bson">
      <div class="bsonson"></div>
      <div class="bsonson"></div>
    </div>
    <div id="b_right" class="bson">

      <dv-scroll-board :config="this.config"  />
    </div>
  </div>
</div>
</template>

<script>
export default {
  data(){
    return {
      config: {
        name: "newIndex",
        header: ['列1', '列2', '列3'],
        data: [
          ['<span style="color:#37a2da;">行1列1</span>', '行1列2', '行1列3'],
          ['行2列1', '<span style="color:#32c5e9;">行2列2</span>', '行2列3'],
          ['行3列1', '行3列2', '<span style="color:#67e0e3;">行3列3</span>'],
          ['行4列1', '<span style="color:#9fe6b8;">行4列2</span>', '行4列3'],
          ['<span style="color:#ffdb5c;">行5列1</span>', '行5列2', '行5列3'],
          ['行6列1', '<span style="color:#ff9f7f;">行6列2</span>', '行6列3'],
          ['行7列1', '行7列2', '<span style="color:#fb7293;">行7列3</span>'],
          ['行8列1', '<span style="color:#e062ae;">行8列2</span>', '行8列3'],
          ['<span style="color:#37a2da;">行1列1</span>', '行1列2', '行1列3'],
          ['行2列1', '<span style="color:#32c5e9;">行2列2</span>', '行2列3'],
          ['行3列1', '行3列2', '<span style="color:#67e0e3;">行3列3</span>'],
          ['行4列1', '<span style="color:#9fe6b8;">行4列2</span>', '行4列3'],
          ['<span style="color:#ffdb5c;">行5列1</span>', '行5列2', '行5列3'],
          ['行6列1', '<span style="color:#ff9f7f;">行6列2</span>', '行6列3'],
          ['行7列1', '行7列2', '<span style="color:#fb7293;">行7列3</span>'],
          ['行8列1', '<span style="color:#e062ae;">行8列2</span>', '行8列3'],
          ['<span style="color:#e690d1;">行9列1</span>', '行9列2', '行9列3'],
          ['行10列1', '<span style="color:#e7bcf3;">行10列2</span>', '行10列3']
        ],
        index: true,
        rowNum: 15,
        oddRowBGC:'grey' ,
        evenRowBGC: 'grey',
        columnWidth: [50],
        align: ['center']
      }
    }
  }
}
</script>

<style scoped>
#main{
  width: 100vw;
  height: 100vh;
  border: red 1px solid;
  display: flex;
  flex-direction: column;

}
#top{
  width: 100vw;
  height: 30vh;
  border: #00b2ff 1px solid;
  margin: 3px;
  display: flex;
  flex-direction: column;

}
#title{
  border: red 1px solid;
  margin: 2px;
  width: 100vw;
  height: 8vh;
}
#menu{
  border: yellow 1px solid;
  height: 22vh;
  width: 100vw;
  margin: 2px;
  display: flex;
  flex-direction: row;
}
.menu{
  margin-right: 3px;

  border: black 1px solid;
  width: 25vw;
  height: auto;
}
#bottom{
  width: 100vw;
  height: 70vh;
  border: green 1px solid;
  margin: 3px;
  display: flex;
  flex-direction: row;
}

.bson{
  width: 33vw;
  border: black 1px solid;
}

#b_center{
  display: flex;
  flex-direction: column;
}
.bsonson{
  border: red 1px solid;
  height: 35vh;
  margin: 3px ;
}

/*.text {*/
/*  font-size: 14px;*/
/*}*/

.item {
  padding: 18px 0;
}
.jichu {
  position: relative;
  border-radius: 3px;
  box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.3)
}
.filecolor {
  background-color: #00a65a !important;
}
.iconfont {
  font-family:"iconfont" !important;
  font-size:16px;
  font-style:normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
