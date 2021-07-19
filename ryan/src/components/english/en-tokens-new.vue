<template>
	<div>
		<span class='span1'>创建新的 API 令牌</span>
    <div  class = 'div1'>
     <div v-for='(k,i) in names' :key='k.id'>
       <span class = 'divspan1'>令牌名称</span>
       <span >
         <input class = 'inputs'/>
       </span>
       <span><button class = 'del' @click="del(i)">删除</button></span>
     </div>
    </div>
    <div><button class='tianjia' @click="tianjia">添加令牌</button></div>
    <div><button class='add' @click="save">保存</button></div>
    <div class="Opalstack">©2021 Opalstack LLC</div>
	</div>
</template>

<script>
	export default{
		data(){
			return{
        names:[{'id':0}],
        count:0,
			}
		},
		mounted(){

		},
		methods:{
      tianjia(){
         this.count+=1
         this.names.push({'id':this.count})
      },
      del(i){
        this.names.splice(i,1)
      },
			save(){
        var that = this
        var data = []
        var inputs = document.getElementsByClassName('inputs')
        for(var i = 0;i<inputs.length;i++){
          if(inputs[i].value !=''){
            data.push({'name':inputs[i].value})
          }
        }
        console.log(data)
        $(".add").attr('disabled', true);
        $.ajax({
          url: URL + "/token/create/",
          headers: token,
          data: JSON.stringify(data),
          type: "POST",
          processData: false,
          contentType: "application/json",
          success: function(data) {
            // var data = JSON.stringify(data)
            // alert("添加成功")
            that.$router.push({path: '/en/tokens'})
          },
          error: function(xhr, status, text) {
            console.log(xhr)
            alert("添加失败")
            $(".add").attr('disabled', false);
          },
        })
      }
		},
		components:{

		},
	}
</script>

<style scoped>
	.span1 {
	  padding: 25px 0px;
	  display: inline-block;
	  font-size: 22px;
	}
  .div1{
    padding: 30px 0px 30px 20px;
    background-color: #fff;
  }
  .inputs{
    width: 250px;
    height: 38px;
    font-size: 16px;
    margin: 0px 15px;
  }
  button{
    width: 100%;
    height: 50px;
    margin-top: 20px;
    font-size: 20px;
  }
  .tianjia{
    width: 120px;
    font-size: 16px;
  }
  .del{
    width: 100px;
    height: 40px;
    vertical-align: bottom;
    font-size: 16px;
    background-color: #fd397a;
   }
</style>
