<template>
  <div class='login'>
    <div class='login-top'>
      <img src="../../static/image/a.png">
      <span class = 'language'>
        <span @click="langfn('chinese')">中 文</span>
        <span @click="langfn('english')">英 文</span>
      </span>
    </div>

    <div class='login-middle' :class = "{'login-middle1':css}">
      <!-- <div> -->
        <div class = 'text' :class = "{'text1':css}">
          <div class = 'texta' :class = "{'texta1':css}">
            <div >
              <p>具有1GB RAM，100GB SSD存储和1TB每月带宽的托管共享Web托管。</p>
              <p>快速管理的服务器和狂热的支持。</p>
              <p>14天免费试用，然后每月$ 15。</p>
              <p>还没有帐号？</p>
            </div>
            <div>
              <button>报名</button>
            </div>
          </div>
        </div>
        <div class = 'login-line' :class = "{'login-line1':css}"></div>
        <div class = 'login-input' :class = "{'login-input1':css}">
          <div class = 'login-inputa' :class = "{'login-inputa1':css}">
              <div>登录</div>
              <div><input v-model="name" placeholder="用户名"></div>
              <div><input v-model="pass" type="password" placeholder="密码" ></div>
              <div class = 'denglu'>
                <a href="https://www.baidu.comm">忘记密码？</a>

                <button @click = 'denglu'>登陆</button>
              </div>
          </div>
        </div>
      <!-- </div> -->
    </div>

    <div class = 'login-bottom'>
      <div>©2021 Opalstack LLC</div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
          css:false,
          name:"",
          pass:'',

      }
    },
    mounted() { 
      var that = this;
      var w = window.innerWidth;
      that.css = w<940?true:false;
      window.onresize = function(){
         var w = window.innerWidth;
         that.css = w<940?true:false;
       }
      var username = localStorage.getItem('username')
      var password = localStorage.getItem('password')
      if(username){
        this.name = username
        this.pass = password
      }
    },
    methods: {
      langfn(lang){
        localStorage.setItem('language',lang)
        if(lang == 'chinese'){
          this.$router.push({'path':'/login'})
        }
      },
      denglu(){
        var that = this;
        var data = {}
        data.username = this.name
        data.password = this.pass
        $.ajax({
          url: URL + "/login/",
          headers:token,
        	type: "POST",
        	data:JSON.stringify(data),
          // data:data,
        	processData: false,
        	contentType: "application/json",
        	success: function(data) {
            // console.log(data)
            token = {"Authorization":"Token "+data.token}
            localStorage.setItem('token','aaa')
        		localStorage.setItem('username',that.name)
            localStorage.setItem('password',that.pass)
            that.$router.push({path:'/en'})
        	}
        })

      },

    },
    components: {

    },
  }
</script>

<style scoped>
  .login{
    background-color: #0f249c;
      color: #fff;
      min-height: 100%;
      min-width: 450px;
  }
  .login>div{
    margin-bottom: ;
  }
  .login-top {
    padding-left: 50px;
    padding-top: 40px;
  }
  .language{
    float: right;
    margin-right: 30px;
    right: 20px;
  }
  .language span{
    margin-left: 20px;
    cursor: pointer;
    font-size: 18px;
  }
  .login-middle{
    margin: 70px 0;
  }
  .login .login-middle1{
    margin: 5px 0;
  }
  .login-middle>div{
    display: inline-block;
    vertical-align: text-top;
    position: relative;
  }
   .text{
     height: 330px;
     width: 50%;
     padding: 60px 0px 60px 0;
   }
   .login .text1{
     display:block;;
     width: 100%;
     padding: 60px 0px 60px 0;
     /* position:static; */
   }
  .texta{
    position: absolute;
    right: 70px;
    text-align: left;
    font-size: 25px;
    font-weight: 500;
    line-height: 38px;
    width: 380px;
  }
  .login .texta1{
    position: static;
    margin: auto;
  }
  p{
    margin: 0px 0 15px 0;
  }
  .text button{
    background-color: #fd1361;
    padding: 13px 15px;
  }
  .login-line{
    margin: 0 70px 0 0px;
    width: 1px;
    height: 450px;
    background-color: #3e4bb9;
  }
  .login .login-line1{
    display: block;
    margin: 0;
    width: 450px;
    height: 1px;
  }
   .login .login-input1{
     display: block;
   }
  .login-inputa{
    text-align: left;
    font-size: 25px;
    font-weight: 500;
    line-height: 38px;
    margin-left: 0px;
    width: 390px;
    height: 300px;
    margin-top: 70px;
  }
  .login .login-inputa1{
    margin: auto;
    margin-top: 30px;
  }
  .login-inputa>div{
    margin-bottom: 30px;

  }
  .login-input>div>div:nth-child(1){
    text-align: center;

  }
  .login-input input{
    width: 358px;
    height: 50px;
    border-radius: 40px;
    border-color: #4E52A8;
    background-color: #0f249c;
    color:#fff;
    padding-left: 25px;
    font-size: 16px;
  }
  .login-input .denglu {
       font-size: 16px;
    }
    .login-input button {
        float: right;
        width: 120px;
        height: 50px;
        border-radius: 40px;
        background-color: #fd1361;
      }
      .login-input button::after {
          border-radius: 40px;
        }
  .login-bottom>div{
    margin: 0px 0 0px 30px;
    height: 50px;
    color:#717ce6;
  }
  .denglu a{
    color:#fff;
  }
</style>
