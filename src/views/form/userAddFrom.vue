<template>
<div>
  <el-form ref="user" :model="user" label-width="80px" >
    <el-form-item label="工号" >
      <el-input v-model="user.id" style="width: 30%"  placeholder="工号"></el-input>
    </el-form-item>
    <el-form-item label="姓名" >
      <el-input v-model="user.userName" style="width: 50%" placeholder="姓名"></el-input>
    </el-form-item>
    <el-form-item label="性别">
      <el-radio-group v-model="user.gender">
        <el-radio label="1"  >男性</el-radio>
        <el-radio label="0"  >女性</el-radio>
      </el-radio-group>
    </el-form-item>

    <el-form-item label="出生日期 ">
      <el-col :span="11">
        <el-date-picker type="date" placeholder="选择日期" v-model="user.birthday" style="width: 100%;" @change="fmartDate"></el-date-picker>
      </el-col>
    </el-form-item>
    <el-form-item label="地址" >
<!--      <el-input v-model="form.name" style="width: 50%"></el-input>-->
<!--      <el-cascader
          :props="props"
          @change="locationsChange"
          placeholder="省/市/区"
          size="small"
          v-model="locationsData"
          clearable
      ></el-cascader>-->
      <el-cascader size="large" :options="options"
                   v-model="selectedOptions"
                   @change="handleChangeSon"
                   placeholder="省/市/区">
      </el-cascader>
      <el-input v-model="detailAddres" style="width: 50%" placeholder="详细地址"  @change="handleChange" ></el-input>
    </el-form-item>
    <el-form-item label="电话" >
      <el-input v-model="user.phone" style="width: 50%" placeholder="电话号码"></el-input>
    </el-form-item>
    <el-form-item label="邮箱" >
      <el-input v-model="user.email" style="width: 50%" placeholder="邮箱地址"></el-input>
    </el-form-item>
    <el-form-item label="角色">
      <el-select v-model="user.characters" placeholder="请选择活动区域">
        <el-option label="管理员111" value="管理员"></el-option>
        <el-option label="普通用户" value="普通用户"></el-option>
        <el-option label="维护者" value="维护者"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="擅长技能">
      <el-input type="textarea" v-model="user.userSkill" style="width: 60%" placeholder="请输入擅长的技能"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">立即创建</el-button>
      <el-button @click="resetForm()">重置</el-button>
      <el-button @click="sendVisible()">取消</el-button>
    </el-form-item>
  </el-form>
</div>
</template>

<script>

import { provinceAndCityData, regionData, provinceAndCityDataPlus, regionDataPlus, CodeToText, TextToCode } from 'element-china-area-data'
import Moment from "moment";
import axios from "axios";

export default {
  data() {
    return {
      detailAddres: '',
      Visible: true,
      options: regionData,
      selectedOptions: [],
      user: {},


    };
  },
  methods: {
    myDateFormat(value,flag){
      if(flag==1){
        return  Moment(value).format("YYYY-MM-DD ");
      }else{
        return Moment(value).format("YYYY-MM-DD HH:mm:ss");
      }


    },
    fmartDate(value){
    this.user.birthday= this.myDateFormat(value,1);


     /* this.user.birthday=; */
    },
    sendVisible(){
      this.Visible=false;
      this.$emit('visibleMessage',this.Visible);
    },
    resetForm(formName) {
      this.$confirm("确定要重置吗？").then(()=>{
        this.user={};
      }).catch();

    },
    onSubmit(){

      this.user.establishTime=new Date();
      this.$confirm('确认添加？')
          .then(_ => {

            axios({
              method: 'POST',
              url: 'http://localhost:22222/pjgo/userinfo/save',
              data: {
                userId: this.user.id,
                userName: this.user.userName,
                gender: this.user.gender,
                birthday: this.user.birthday,
                address: this.user.address,
                userSkill: this.user.userSkill,
                characters: this.user.characters,
                establishTime: this.user.establishTime,
                phone: this.user.phone,
                email: this.user.email
              }
            }).then(()=>{
              this.$router.go(0);
              this.user={};
              this.Visible=false;
            })
          })
          .catch(_ => {});

    },
    handleChangeSon(){
     var location= CodeToText[this.selectedOptions[0]]+CodeToText[this.selectedOptions[1]]+CodeToText[this.selectedOptions[2]];
     this.user.address=location;
      console.log(location)
     return location;
    },
    handleChange(value) {

      var locatuion=this.handleChangeSon();
      if(location==NaN){
        this.user.address=value;
      }else {
        var fullAddress=locatuion+value;
        this.user.address=fullAddress;
      }

    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },

  }
}
</script>

<style scoped>

</style>
