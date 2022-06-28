<template>
  <div class="webrtc_face_recognition">
    <div class="option">
      <div>
        <label>面板操作：</label>
        <button @click="fnOpen">启动摄像头视频媒体</button>
        <button @click="fnClose">结束摄像头视频媒体</button>
      </div>
      <div>
        <label>
          当前人脸检测数值：{{ faceValue }}
        </label>

        <label>
          服务器返回人脸特征：{{ f2 }}
        </label>

        <label>
          <button id="snapshot" @click="takePhotoFn(this.videoEl)">拍照</button>
        </label>
      </div>

    </div>
    <div class="see">
      <video
        id="myVideo"
        muted
        loop
        playsinline
        @loadedmetadata="fnRun"
      ></video>
      <canvas id="myCanvas" />
    </div>

  </div>
</template>

<script>
import * as faceapi from "face-api.js";
import Vue from "vue";
import axios from "axios";


export default {
  name: "WebRTCFaceRecognition",
  components: {

  },
  data() {

    return {
      f2:"空值",
      faceValue: 0.00,
      faceImgVal: false, // 设置仅仅发送一张图片 当faceValue大于0.95时候 保存
      nets: "tinyFaceDetector", // 模型
      options: null, // 模型参数
      withBoxes: true, // 框or轮廓
      detectFace: "detectSingleFace", // 单or多人脸
      detection: "landmark",
      videoEl: null,
      canvasEl: null,

      timeout: 0,
      // 视频媒体参数配置
      constraints: {
        audio: false,
        video: {
          // ideal（应用最理想的）
          width: {
            min: 320,
            ideal: 500,
            max: 1920
          },
          height: {
            min: 240,
            ideal: 500,
            max: 1080
          },
          // frameRate受限带宽传输时，低帧率可能更适宜
          frameRate: {
            min: 15,
            ideal: 30,
            max: 60
          },
          // 显示模式前置后置
          facingMode: "environment"
        }
      }
    };
  }
,
  watch: {
    nets(val) {
      this.nets = val;
      this.fnInit();
    },
    detection(val) {
      this.detection = val;
      this.videoEl.pause();
      setTimeout(() => {
        this.videoEl.play();
        setTimeout(() => this.fnRun(), 300);
      }, 300);
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.fnInit();
    });
  },
  methods: {

    /**
     * base64转文件
     * @param data base64图片格式字符串
     * @param fileName 文件名称
     * @returns {File} 返回文件值
     */
    base64toFile(data, fileName) {
      const dataArr = data.split(",");
      const byteString = atob(dataArr[1]);
      const options = {
        type: "image/jpeg",
        endings: "native"
      };
      const u8Arr = new Uint8Array(byteString.length);
      for (let i = 0; i < byteString.length; i++) {
        u8Arr[i] = byteString.charCodeAt(i);
      }
      return new File([u8Arr], fileName, options);
    },
    /**
     * 截图视频流绘制图片返回base64编码
     * @param video  系统视频流对象
     * @returns {string} 返回编码
     */
    takePhotoFn(video) {
      let canvas = document.createElement("canvas");
      canvas.width = canvas.height = 500;
      let ctx = canvas.getContext("2d");
      let w = video.offsetWidth;
      let h = video.offsetHeight;
      let y = (canvas.width - h) / 2;
      // 填充
      ctx.drawImage(video, 0, y, w, h);
      // 取出图片编码
      // 返回
      return canvas.toDataURL("image/jpeg", 1.0);
    },

    /**
     * 调用人脸识别api
     * @param faceFile 人脸文件
     * @returns {string}  返回信息
     */
    getFaceApi(faceFile){
      let  baseUrl="http://localhost:11331/api/face.1.0/info/add/uid"

      axios.post(
        baseUrl,
        faceFile).
      then((su)=>{
        console.log(new Date().getTime(),"请求服务器返回值",su);

        console.log(su.data.su);
        this.f2=su.data.su
        axios.get("http://39.105.202.162:11236//api/face.1.0/tsss")
        alert("识别成功")
        this.$router.go(0)
      }).catch(err=>{
        console.log("请求服务器失败",err);
      })

      return "";
    },

    // 初始化模型加载
    async fnInit() {
      await faceapi.nets[this.nets].loadFromUri("/models"); // 算法模型
      await faceapi.loadFaceLandmarkModel("/models"); // 轮廓模型
      // 根据算法模型参数识别调整结果
      this.options = new faceapi.TinyFaceDetectorOptions({
        inputSize: 512, // 160 224 320 416 512 608
        scoreThreshold: 0.5 // 0.1 ~ 0.9
      });
      // 节点属性化
      this.videoEl = document.getElementById("myVideo");
      this.canvasEl = document.getElementById("myCanvas");

    },
    // 人脸面部勘探轮廓识别绘制
    async fnRunFaceLandmark() {
      //console.log("跑脸地标");
      if (this.videoEl.paused) return clearTimeout(this.timeout);
      // 识别绘制人脸信息
      const result = await faceapi[this.detectFace](
        this.videoEl,
        this.options
      ).withFaceLandmarks();
      if (result && !this.videoEl.paused) {
        const dims = faceapi.matchDimensions(this.canvasEl, this.videoEl, true);
        const resizeResult = faceapi.resizeResults(result, dims);

        // 将获取到的人脸展现参数展现同步绑定到页面上
        this.faceValue = resizeResult.alignedRect.classScore;

        this.withBoxes
          ? faceapi.draw.drawDetections(this.canvasEl, resizeResult)
          : faceapi.draw.drawFaceLandmarks(this.canvasEl, resizeResult);

        if (!this.faceImgVal && this.faceValue>0.90){

          //  截图 获取当前图片的base64编码
         let val64=this.takePhotoFn(this.videoEl)
          // 转化为文件
          let file = this.base64toFile(val64,new Date().getTime()+'.jpg')//base64图片格式转文件流
          let fileFace = new FormData();
          fileFace.append("faceImg", file);
          fileFace.append("uid",val64.length.toString())

          // 发送请求
          this.getFaceApi(fileFace)
          // 停止采集退出
          this.faceImgVal=!this.faceImgVal;
          //关闭摄像头
          this.fnClose();
        }


      } else {
        this.canvasEl
          .getContext("2d")
          .clearRect(0, 0, this.canvasEl.width, this.canvasEl.height);
      }
      this.timeout = setTimeout(() => this.fnRunFaceLandmark());
    },

    // 执行检测识别类型
    fnRun() {
      if (this.detection === "landmark") {
        this.fnRunFaceLandmark();
      }
    },
    // 启动摄像头视频媒体
    fnOpen() {
      if (typeof window.stream === "object") return;
      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        clearTimeout(this.timeout);
        navigator.mediaDevices
          .getUserMedia(this.constraints)
          .then(this.fnSuccess)
          .catch(this.fnError);
      }, 300);
    },
    // 成功启动视频媒体流
    fnSuccess(stream) {
      window.stream = stream; // 使流对浏览器控制台可用
      console.log(window.stream)
      this.videoEl.srcObject = stream;

      this.videoEl.play();
    },
    // 失败启动视频媒体流
    fnError(error) {
      console.log(error);
      alert("视频媒体流获取错误" + error);
    },
    // 结束摄像头视频媒体
    fnClose() {
      this.canvasEl
        .getContext("2d")
        .clearRect(0, 0, this.canvasEl.width, this.canvasEl.height);
      this.videoEl.pause();
      clearTimeout(this.timeout);
      if (typeof window.stream === "object") {
        window.stream.getTracks().forEach((track) => track.stop());
        window.stream = "";
        this.videoEl.srcObject = null;
      }
    }
  },
  beforeDestroy() {
    this.fnClose();
  }
};
</script>

<style scoped>
button {
  height: 30px;
  border: 2px #42b983 solid;
  border-radius: 4px;
  background: #42b983;
  color: white;
  margin: 10px;
}

.see {
  position: relative;
}

.see canvas {
  position: absolute;
  top: 0;
  left: 0;
}

.option {
  padding-bottom: 20px;
}

.option div {
  padding: 10px;
  border-bottom: 2px #42b983 solid;
}

.option div label {
  margin-right: 20px;
}
</style>
