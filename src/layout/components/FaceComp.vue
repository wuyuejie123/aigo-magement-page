<template>
<div>
  测试父子通信 {{name}}人脸的值id为{{id}}

  <input v-model:value="v1" type="text">
  子组件按钮：<button @click="onSon(v1)">子事件</button>
</div>
</template>

<script>
export default {
  name: "FaceComp",
  props: {
    name: String,
    id: Number
  },
  data (){
    return {
        v1:"son"
    }
  },
 methods: {
   onSon(item){
     console.log("子组件打印:",item);
      // 获取本子组件数据
      this.$emit('myitemclick',item)
   }
 }
};
</script>

<style scoped>

</style>
