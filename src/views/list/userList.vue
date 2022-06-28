<template>
  <div class="app-container">
    <el-card>
      <!-- 头部 begin -->
      <div slot="header" class="app-card-header">
        <div class="left">
          <span class="header-title">人员</span>
        </div>
        <div class="right">
          <el-button size="small" icon="el-icon-plus" type="primary" @click="drawer = true">新增</el-button>
        </div>
      </div>
      <!-- 头部 end -->

      <!-- 表格 begin -->

      <el-table
          :data="userList"
          style="width: 100%">
        <el-table-column type="expand">
          <template slot-scope="props" >
        <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="工号">
                <span>{{props.row.userId }}</span>
              </el-form-item>
          <el-form-item label="姓名">
            <span>{{props.row.userName }}</span>
          </el-form-item>

          <el-form-item label="性别">
          <span>{{(props.row.gender)==1?'男':'女' }}</span>
          </el-form-item>

          <el-form-item label="出生日期" >
          <span>{{(props.row.birthday)|formatDate}}</span>
          </el-form-item>

          <el-form-item label="地址">
            <span>{{props.row.address }}</span>
          </el-form-item>

          <el-form-item label="角色">
            <span>{{props.row.characters }}</span>
          </el-form-item>
          <el-form-item label="电话">
            <span>{{props.row.phone }}</span>
          </el-form-item>
          <el-form-item label="邮箱">
            <span>{{props.row.email }}</span>
          </el-form-item>
          <el-form-item label="擅长技能">
            <span>{{props.row.userSkill }}</span>
          </el-form-item>

          <el-form-item label="入职时间">
          <span>{{props.row.establishTime|formatDate }}</span>
        </el-form-item>

          <el-form-item label="修改时间">
            <span>{{props.row.updateTime|formatDate}}</span>
          </el-form-item>
          <el-form-item label="操作">
      <el-button type="danger" plain size="mini" @click="delUser(props.row)">把他删除？</el-button>
<!--            <el-popconfirm
                cancel-button-text='不用了',
                confirm="delUser(props.row)"
                title="这是一段内容确定删除吗？"
            >-->
<!--              <el-button slot="reference"  type="danger" plain size="mini" >把他删除？</el-button>
            </el-popconfirm>-->

          </el-form-item>


        </el-form>
          </template>
        </el-table-column>

        <el-table-column id="userid"
            label="工号" prop="userId">
        </el-table-column>
        <el-table-column
            label="姓名" prop="userName">
        </el-table-column>
        <el-table-column
            label="性别" prop="">
          <template slot-scope="props">
           {{props.row.gender==1?'男':'女'}}
          </template>
        </el-table-column>
        <el-table-column
            label="角色" prop="characters">
        </el-table-column>
        <el-table-column
            label="操作">
<!--   template slot-scope="scope" 通过它获取某一行的id       -->
          <template slot-scope="scope">
          <el-button type="primary"  plain size="mini" @click="dialogVisible = true,getUserIdAndQuery(scope.row.userId)" >编辑</el-button>

          </template>
        </el-table-column>

      </el-table>
    </el-card>
<!-- 模态框   -->
    <el-dialog
        title="提示"
        :visible.sync="dialogVisible"
        width="30%"
        :before-close="handleClose">
<!--  引入userForm组件    -->
      <userForm @dialogVisible="getdialogVisible()" :userInfo="userInfos" ></userForm>

    </el-dialog>

<!--  添加抽屉  -->
    <el-drawer
        size="45%"
        title="我是标题"
        :visible.sync="drawer"
        :direction="direction"
        :before-close="handleClose">
    <userAddFrom @visibleMessage="drawerFlag()"></userAddFrom>
    </el-drawer>
  </div>
</template>

<script>
import userForm from "../form/userForm";
import axios from "axios";
import userAddFrom from "../form/userAddFrom";
export default {
  data() {
    return {
      drawer: false,
      direction: 'rtl',
      listLoading: true,
      userList:[],
      result:{},
      dialogVisible: false,
      activeNames: ['1'],
      userInfos: {}

    };
  },
  components: {
    userForm,
    userAddFrom
  },

  methods: {
    delUser(userInfo){
    this.$confirm('确定要把 “'+userInfo.characters+'“ '+userInfo.userName+' 从改系统中除名吗？')
        .then(()=>{

        axios({
          method: 'GET',
          url: 'http://localhost:22222/pjgo/userinfo/delete?userIds='+userInfo.userId,
          // data: {
          //   userIds: [userInfo.userId]
          // }

        }).then(()=>{
          alert('成功')
          this.$router.go(0)
        }).
            catch(()=>{
              console.log(userInfo.userId)
        })
        })

      },

    setdrawer(){

    },
    handleClose(done) {
      done();
      // this.$confirm('确认关闭？')
      //     .then(_ => {
      //
      //     })
      //     .catch(_ => {});
  },
    drawerFlag(data){
      this.drawer=data;
    },
  getdialogVisible(data){
      console.log("data",data)
      this.dialogVisible=data;
  },
    getUserIdAndQuery(userid) {
      console.log(userid,'userform');
      axios.get('http://localhost:22222/pjgo/userinfo/info/'+userid).then(
          response=>{
            this.userInfos=response.data.userInfo;
            console.log(this.userInfos);
          }
      ).catch().then();

    }
},
  mounted() {
    const axios=require('axios');
    axios.get("http://localhost:22222/pjgo/userinfo/list").then(result=>{
      const response= result.data;
      this.userList=response.page.list;
      this.result=response;
      console.log(this.userList)
    }).catch(error=>{

        }).then(()=>{

    });
  }
};
</script>

<style>
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
