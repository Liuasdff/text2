<template>
	<div class = "mainew">
		<div class = "mainewdiv">
      <div class = "top">新邮件用户</div>
      <div class = "xijie">细节</div>
      <div class = "div2">
          <div class = "fauser"><i class = "fa fa-user-circle-o"></i><span>邮件用户用于传入和传出电子邮件身份验证。</span></div>

          <div id = "mainewkldv">
            <div id = "mainewkldiv">
              <div>用户名</div>
              <div><input class = 'name' placeholder="请输入邮箱用户名"></div>
              <div>邮箱服务器</div>
              <div>
                <span class="option" >
                	<select class = "serve"  autocomplete="off">
                    <option v-for = '(k,i) in data' :key = 'k.id' :idd = 'k.id' :value="k.hostname">&nbsp; {{ k.hostname }}</option>
                  </select>
                	<div>
                    <div class="optiondiv fa fa-angle-down"></div>
                  </div>
                </span>
              </div>
              <div>Procmail规则</div>
              <div class = "textarea"><textarea class = "procmailrc" placeholder="Procmail规则可用于过滤传入的邮件"></textarea></div>
              <div>
                <span class = "swspan1">启用自动回复</span>
                <span class = "swspan"><switchs :height = "'40px'" :width = "'80px'"></switchs></span>
              </div>
              <div class = "swsdiv">
                <span class = "swspan1"></span>
                <span>如果选中此选项，请发送以下自动回复。</span>
              </div>
              <div>自动应答器主体</div>
              <div class = "textarea"><textarea class = "message" placeholder = "自动回复文本在此处"></textarea></div>
              <maiswitch :index = 'i' @chliddel = 'del' v-for="(k,i) in switcharr" :key='k.id'></maiswitch>
            </div>
          </div>

          <div><button @click="add"><i>十</i><span>添加邮件用户</span></button></div>
      </div>
      <div class = "jiu">
        <div><button class = 'add' @click="Saver">保存</button></div>
      </div>
    </div>
    <div class = "Opalstack">©2021 Opalstack LLC</div>
	</div>
</template>

<script>
  import switchs from './myComponents/switch.vue'
  import maiswitch from './maiswitch.vue'
	export default{
		data(){
			return{
         switcharr:[],
         iii:0,
         data:[],
         
			}
		},
    created(){

    },
		mounted(){     
       var that = this
       $.ajax({
         url: URL + "/server/list/",
         headers: token,
         type: "GET",
         processData: false,
         contentType: "application/json",
         success: function(dataa) {
           that.data = dataa.imap_servers
         }
       })
		},
		methods:{
       add(){
         this.switcharr.push({"id":this.iii})
         this.iii+=1
       },
       del(i){
         this.switcharr.splice(i,1)
       },
       selectchange(){

       },
       Saver(){
         var that = this
         var cldiv = document.getElementById('mainewkldiv')
         var name = cldiv.getElementsByClassName('name')
         var imap_serve = cldiv.getElementsByClassName('serve')
         var procmailrc = cldiv.getElementsByClassName('procmailrc')
         var autoresponder_enable = cldiv.getElementsByClassName('switchOnoff')
         var autoresponder_message = cldiv.getElementsByClassName('message')
         var ajaxdata = []
         for(var i = 0 ;i< name.length;i++){
            var data = {}
            var index = imap_serve[i].selectedIndex
            data.imap_server = imap_serve[i].options[index].getAttribute('idd')
            data.name = name[i].value
            data.procmailrc = procmailrc[i].value
            var switc = autoresponder_enable[i]. innerText
            switc = switc == "ON"?true:false
            data.autoresponder_enable = switc
            data.autoresponder_message = autoresponder_message[i].value
            ajaxdata.push(data)
         }
         if(data.name == ""){
           alert("请输入用户名 ")
           return true
         }
         $(".add").attr('disabled',true);
         $.ajax({
            url:URL + "/mailuser/create/",
            headers:token,
            data:JSON.stringify(ajaxdata),
            type: "POST",
         	  processData: false,
            contentType: "application/json",
         	  success: function(data){
              that.$router.push({path:'/en/mailusers'})
            },
            error: function(xhr, status, text) {
              console.log(xhr)
              var a = ''
              var b = xhr.responseJSON
              a = JSON.stringify(b)
              a = a==undefined?JSON.stringify(xhr):a
              myalert(a)
              $(".add").attr('disabled',false);
            },

         })
       },
		},
		components:{
       switchs,
       maiswitch,
		},
	}
</script>

<style scoped>
  .mainewdiv{
    padding: 0 24px 40px 24px;
  }
  .mainewdiv input,.mainewdiv .option{
    width: 100%;
    height: 40px;
    font-size: 16px;
    margin: 10px 0 25px 0;
  }
  .textarea{
      margin: 10px 0 25px 0;
  }
  .mainewdiv textarea{
     width: 100%;
     font-size: 16px;
     border-color:#7680b1;
     outline:none;
     text-indent: 8px;
     resize:none;
     min-height: 80px;
   }
   .top{
     height: 70px;
     line-height: 70px;
     font-size: 20px;
   }
   .div2{
     padding: 20px 24px 0 24px;
     background-color: #fff;
   }
   .xijie{
     background-color: #fff;
     padding-left:24px;
     height: 60px;
     line-height: 60px;
     font-size: 18px;
     border-bottom: 1px solid #7680b1;
   }
   .fauser{
     height: 70px;
     line-height: 70px;
     border: 1px solid #7680b1;
     padding-left:20px;
     margin-bottom: 30px;
   }
   .fauser i{
    font-size: 30px;
    vertical-align: middle;
    margin-right: 20px;
   }
   .swspan1{
     display: inline-block;
     width: 150px;
   }
   .swspan{
     vertical-align: middle;
   }
   .swsdiv{
       margin: 10px 0 0 0;
   }
   .mainew button{
     height: 40px;
   }
   .jiu{
     padding: 30px 20px;
     background-color:#fff ;
     /* border-bottom: 1px solid #7680b1; */
   }
   .jiu button{
     width: 100%;
     height: 50px;
   }

</style>
