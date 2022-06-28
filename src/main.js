import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import echarts from 'echarts'
import dataV from '@jiaminghi/data-view'

//图片插件
import Viewer from 'v-viewer'
import 'viewerjs/dist/viewer.css'

Vue.use(Viewer)
Vue.use(dataV)
//引入视频播放器
import  VideoPlayer from 'vue-video-player'
// element begin
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// element end
import  Moment from 'moment';
import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import '@/styles/index.scss' // style

// vue-awesome begin --- https://fa5.dashgame.com/#/%E5%9B%BE%E6%A0%87
import 'vue-awesome/icons'
import Icon from 'vue-awesome/components/Icon'
require('video.js/dist/video-js.css')
require('vue-video-player/src/custom-theme.css')

import Axios from "axios";
/*import flvjs from 'flv.js'
Vue.use(flvjs)*/
Vue.prototype.$echarts = echarts
Vue.use(VideoPlayer)
Vue.use(ElementUI)
Vue.prototype.axios = Axios;
Vue.component('v-icon', Icon)
// vue-awesome end

Vue.config.productionTip = false
Vue.filter('formatDate',function (value){
  return Moment(value).format("YYYY-MM-DD HH:mm:ss");
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
