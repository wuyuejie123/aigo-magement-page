<template>
  <div id="app">
    <router-view />
<!--    <WebRTCFaceRecognition></WebRTCFaceRecognition>-->
  </div>
</template>
<script>
import
  WebRTCFaceRecognition from "./views/list/face/WebRTCFaceRecognition"
export  default {
  components:{
    WebRTCFaceRecognition
  }
}
</script>
<style>

</style>
