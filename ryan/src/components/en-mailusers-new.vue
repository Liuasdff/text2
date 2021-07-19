<template>
	<div class = "mainew">
		<div class = "mainewdiv">
      <div class = "top">New Mail User</div>
      <div class = "xijie">Details</div>
      <div class = "div2">
          <div class = "fauser"><i class = "fa fa-user-circle-o"></i><span>Mail Users are for both incoming and outgoing email authentication.</span></div>

          <div id = "mainewkldv">
            <div id = "mainewkldiv">
              <div>Username</div>
              <div><input class = 'name' placeholder="Mail User Name"></div>
              <div>Mailbox Server</div>
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
              <div>Procmail Rules</div>
              <div class = "textarea"><textarea class = "procmailrc" placeholder="Procmail rules may be used to filter incoming mail"></textarea></div>
              <div>
                <span class = "swspan1">Enable Autoresponder</span>
                <span class = "swspan"><switchs :height = "'40px'" :width = "'80px'"></switchs></span>
              </div>
              <div class = "swsdiv">
                <span class = "swspan1"></span>
                <span>If this is checked, send the following autoresponse.</span>
              </div>
              <div>Autoresponder Subject</div>
              <div class = "textarea"><textarea class = "subject" placeholder = ""></textarea></div>
              <div>Autoresponder Body</div>
              <div class = "textarea"><textarea class = "message" placeholder = "Autoresponder text goes here"></textarea></div>
              <maiswitch :index = 'i' @chliddel = 'del' v-for="(k,i) in switcharr" :key='k.id'></maiswitch>
            </div>
          </div>

          <!-- <div><button @click="addd"><i>十</i><span>Add Mail User</span></button></div> -->
      </div>
      <div class = "btn">
        <button class = 'add' @click="add">Add Mail User</button>
        <button class = 'quxiao' @click="quxiao">Cancel</button>
      </div>
    </div>
    <div class = "Opalstack">©2021 Opalstack LLC</div>
	</div>
</template>

<script>
  import switchs from './myComponents/switch.vue'
  import maiswitch from './en-mailusers-switch.vue'
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
      quxiao(){
        this.$router.push({path:'/en/mailusers'})
      },
       addd(){
         this.switcharr.push({"id":this.iii})
         this.iii+=1
       },
       del(i){
         this.switcharr.splice(i,1)
       },
       selectchange(){

       },
       add(){
         var that = this
         var cldiv = document.getElementById('mainewkldiv')
         var name = cldiv.getElementsByClassName('name')
         var imap_serve = cldiv.getElementsByClassName('serve')
         var procmailrc = cldiv.getElementsByClassName('procmailrc')
         var autoresponder_enable = cldiv.getElementsByClassName('switchOnoff')
         var autoresponder_message = cldiv.getElementsByClassName('message')
         var autoresponder_subject = cldiv.getElementsByClassName('subject')
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
            data.autoresponder_subject = autoresponder_subject[i].value
            ajaxdata.push(data)
         }
         if(data.name == ""){
           alert2("Name field may not be blank ")
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
             alert2(xhr.responseText.replace(/\"|\'|\[|\]|\{|\}/g,''))
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
      margin: 10px 0 0px 0;
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
   .btn{
     background-color:#fff ;
   }


</style>
