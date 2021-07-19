<template>
	<div class = "new">
		<span>新系统用户</span>
    <div class = "newuser">
       <div>
          细节
       </div>
       <div >
         <div>姓名</div>
         <div><input v-model="input1"></div>
         <div class = "div3">服务器用户名。</div>
         <div>服务器</div>
         <div>
           <span class="option" >
           	<select class = "usersadd" @change="selectchange()"  autocomplete="off">
           		<option v-for = "(k,i) in option" :value="k.hostname"> &nbsp; {{ k.hostname }} </option>
           	</select>
           	<div>
               <div class="optiondiv fa fa-angle-down"></div>
             </div>
           </span>
         </div>
         <div class = "div6">要在其上安装该用户的服务器。</div>
       </div>
       <div class = "btn">
         <button class = 'add' @click="add">添加系统用户</button>
         <button class = 'quxiao' @click="quxiao">取消</button>
       </div>
    </div>
    <div class = "Opalstack">©2021 Opalstack LLC</div>
	</div>
</template>

<script>
	export default{
		data(){
			return{
         option:[],
         input1:"",
			}
		},
		mounted(){
       var that = this
       $.ajax({
           url: URL + "/server/list/",
           headers:token,
           type: "GET",
           // data:JSON.stringify(data),
         	processData: false,
           contentType: "application/json",
         	success: function(data){
            // console.log(data.web_servers)
            that.option = data.web_servers
           }
       })
		},
		methods:{
      quxiao(){
        this.$router.push({path:'/users'})
      },
      add(){
        var that = this
        var data = []
        if(this.input1 !=""){
          var div = document.getElementsByClassName("usersadd")[0]
          var index = div.selectedIndex
          var idd = this.option[index].id
          var obj = {}
          obj.server = idd
          obj.name = this.input1
          data.push(obj)
          $(".add").attr('disabled',true);
          // console.log(data)
          $.ajax({
              url: URL + "/osuser/create/",
              headers:token,
              type: "POST",
              data:JSON.stringify(data),
            	processData: false,
              contentType: "application/json",
            	success: function(data){
              that.$router.push({path:'/users'})
              },
              error: function(xhr, status, text) {
                // console.log(xhr)
                alert1(xhr.responseText.replace(/\"|\'|\[|\]|\{|\}/g,''))
                $(".add").attr('disabled',false);
              },
          })
        }else{
          alert1("用户名不能为空")
        }

      },
		},
		components:{

		},
	}
</script>

<style scoped>
    .new>span{
      display: inline-block;
       height: 70px;
       padding-left: 32px;
       line-height: 70px;
       font-size: 20px;
    }
    .newuser{
      display: flex;
      /* 下面一行兼容IE */
      flex-direction: column;
      /* !*flex-direction: column;*!可写可不写 */
      justify-content: center;
      align-items: center;
      margin-bottom: 40px;
    }
    .newuser>div{
      padding: 0 20px;
      display: inline;
      width: 100%;
      max-width: 500px;
      background-color: #fff;
    }
    .new input{
      width: 100%;
      height: 38px;
      font-size: 16px;
    }
    .new .option{
      width: 100%;
      height: 40px;
    }
    .newuser>div:nth-child(1){
      height: 60px;
      line-height: 60px;
      font-size: 18px;
    }
    .newuser>div:nth-child(2){
      border: 1px solid #ececf1;
    }
    .newuser>div:nth-child(2)>div{
      margin: 5px 0;
    }
    .newuser .div3,.newuser .div6{
      height: 60px;
    }
   .newuser .btn{
      padding-bottom: 25px;
      padding-top: 25px;
    }
</style>
