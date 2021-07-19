<template>
	<div class = 'mari-update'>
		<div>
      <div class = 'div1'>登录</div>
      <div class='div2'>
        <span>服务器</span>
        <span class="option">
        	<select autocomplete="off" v-model="select1">
        		<option v-for="(k,i) in server" value="k.name"> &nbsp; {{ k.name }}</option>
        	</select>
        	<div>
        	  <div class="optiondiv fa fa-angle-down"></div>
        	</div>
        </span>
      </div>
      <div class='div2'>
        <span>用户名</span>
        <span><input v-model="input1"></span>
      </div>
      <div class='div2'>
        <span>密码</span>
        <span><input v-model="input2" type="password"></span>
      </div>
      <div class='div2'>
        <span>数据库</span>
        <span><input v-model="input3" ></span>
      </div>
      <div class='div3'>
        <button class='add' @click="login">登录</button>
        <input  v-model="input4" type="checkbox" />
        <span>永久登录</span>
      </div>
    </div>
	</div>
</template>

<script>
	export default{
		data(){
			return{
        server:[],
        select1:'',
        input1:'',
        input2:'',
        input3:'',
        input4:false,
			}
		},
		mounted(){

		},
		methods:{
      login(){
        var data = []
        data = [{'a':this.select1,'b':this.input1,'c':this.input2,'d':this.input3}]
        console.log(data)
        console.log(this.input4)
        var that = this
        $(".add").attr('disabled',false);
        $.ajax({
           url: URL + "/mariadb/update/",
           headers:token,
           data:JSON.stringify(data),
           type: "POST",
        	  processData: false,
           contentType: "application/json",
        	  success: function(data){
              // conosle.log(data)
              // alert("添加成功" )
              if(that.input4 == true){
                console.log(that.input4)
              }
              that.$router.push({path:'/mariadbs'})
           },
           error: function(xhr, status, text) {
             console.log(xhr)
             var d = xhr.responseText
              alert('d登录失败')
             $(".add").attr('disabled',false);
           },
        })
      },
		},
		components:{

		},
	}
</script>

<style scoped>
	.mari-update{
    padding: 20px;
  }
  .mari-update>div{
    padding:0px 20px;
    background-color: #fff;
    border-radius: 5px;
    display: inline-block;
    width: 500px;
  }
  .div1{
    height: 60px;
    line-height: 60px;
    font-size: 22px;
  }
  .div2,.div3{
    margin-bottom: 10px;
  }
  .div2>span:nth-child(1){
    display: inline-block;
    text-align: justify;
    text-align-last: justify;
    width: 120px;
    line-height: 40px;
    margin-right: 10px;
  }
  .div2 input,.div2 .option{
    width: 360px;
    height: 40px;
  }
  .div3 button{
    height: 40px;
    width: 120px;
  }
  .div3 input{
    margin: 0px 10px 0px 50px;
  }
</style>
