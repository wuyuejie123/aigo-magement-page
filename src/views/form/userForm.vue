<template>
<div>
  <el-form :model="this.userInfo"  ref="ruleForm" label-width="100px" class="demo-ruleForm">
    <el-form-item label="姓名" prop="name">
      <el-input v-model="this.userInfo.userName" ></el-input>
    </el-form-item>
    <el-form-item label="性别" prop="region">
      <el-select v-model="userInfo.gender==1?'男':'女'">
        <el-option label="男" value="1"></el-option>
        <el-option label="女" value="2"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="出生日期" required>
      <el-col :span="11">
<!-- prop="date1"-->
        <el-form-item >
          <el-date-picker type="date" v-model="userInfo.birthday" style="width: 100%;"></el-date-picker>
        </el-form-item>
      </el-col>
    </el-form-item>
    <el-form-item label="地址" prop="name">
      <el-input v-model="userInfo.address" value="ddd"></el-input>
    </el-form-item>
    <el-form-item label="电话" prop="name">
      <el-input v-model="userInfo.phone" value="ddd"></el-input>
    </el-form-item>
    <el-form-item label="邮箱" prop="name">
      <el-input v-model="userInfo.email" value="ddd"></el-input>
    </el-form-item>
    <el-form-item label="擅长技能" prop="name">
      <el-input v-model="userInfo.userSkill" value="ddd"></el-input>
    </el-form-item>
    <el-form-item label="角色" prop="region">
      <el-select v-model="userInfo.characters">
        <el-option label="普通用户" value="shanghai"></el-option>
        <el-option label="管理员" value="beijing"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit(),sendDialogVisible()">确认</el-button>
      <el-button @click="sendDialogVisible()">取消</el-button>
    </el-form-item>
  </el-form>
</div>
</template>

<script>
import axios from "axios";

export default {
  props:['userInfo'],
  data() {
    return {
      user: {},
      dialogVisible: true,
      aa: "dddd",
   /*   userInfo: {},*/

    };
  },
  methods: {

    onSubmit() {

      axios({
        method: "POST",
        url: "http://localhost:22222/pjgo/userinfo/update",
        data:{
          userId:this.userInfo.userId,
          userName:this.userInfo.userName,
          gender: this.userInfo.gender,
          birthday: this.userInfo.birthday,
          address: this.userInfo.address,
          phone: this.userInfo.phone,
          email: this.userInfo.email,
          userSkill: this.userInfo.userSkill,
          characters: this.userInfo.characters,
          updateTime: new Date()
        }
      } ).then(
        success=>{
          console.log(success,'success');
        }
      ).catch(
          error=>{
            console.log(error)
          }
      ).then();
    },
    //向父组件传值，控制模态框的开关
    sendDialogVisible(flag) {

      this.dialogVisible = false;
      this.$emit('dialogVisible', this.dialogVisible);



    }
    },
  mounted() {
    console.log("======")
    console.log(this.userInfo)
   this.userInfo;
    // console.log(this.user)
    // console.log(this.userId,'userform');
    // var id=this.userId;
    // axios.get('http://localhost:22222/pjgo/userinfo/info/'+id).then(
    //     response=>{
    //       this.userInfo=response.data.userInfo;
    //       console.log(response.data.userInfo)
    //     }
    // ).catch().then();
  }


}
</script>

<style scoped>

</style>
