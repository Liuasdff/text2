<template>
	<div class = "mai-update">
	  <span>Edit {{ obj.name }}</span>
    <div class = "xijie">Details</div>
	  <div id = "mai-update">
		   <div>Procmail Rules</div>
		   <div class = "textarea"><textarea :value="obj.procmailrc" class = "procmailrc" placeholder="Procmail rules may be used to filter incoming mail"></textarea></div>
		   <div>
		     <span class = "swspan1">Enable Autoresponder</span>
		     <span class = "swspan"><switchs ref='switch1' :height = "'40px'" :width = "'80px'"></switchs></span>
		   </div>
		   <div class = "swsdiv">
		     <span class = "swspan1"></span>
		     <span>If this is checked, send the following autoresponse.</span>
		   </div>
       <div class = 'Subject'>Autoresponder Subject</div>
       <div class = "textarea"><textarea :value="obj.autoresponder_subject" class = "subject" placeholder = ""></textarea></div>
		   <div>Autoresponder Body</div>
		   <div class = "textarea"><textarea :value="obj.autoresponder_message" class = "message" placeholder = "Autoresponder text goes here"></textarea></div>
	  </div>
    <div class = "btn">
      <button class = 'add' @click="add">Save</button>
      <button class = 'quxiao' @click="quxiao">Cancel</button>
    </div>
	  <div class = "Opalstack">©2021 Opalstack LLC</div>
	</div>
</template>

<script>
// import maiswitch from './maiswitch.vue'
import switchs from './myComponents/switch.vue'
export default{
    data(){
	      return{
            globalsearch:search,
            user:"",
            obj:{},
		    }
	  },
    props:['updatename','updateid'],
	  mounted(){
      this.obj = JSON.parse(localStorage.getItem('mai-update'))
      if(this.obj.autoresponder_enable == true){
        this.$refs.switch1.ON()
      }
      // console.log(this.obj )
        // var data = JSON.stringify(token)
        var that = this
        $.ajax({
      	    url: URL + "/mailuser/list/",
      	    headers:token,
      	    type: "GET",
       	    processData: false,
            contentType: "application/json",
       	    success: function(data) {

       	    }
        })
	  },
	  methods:{
        quxiao(){
          this.$router.push({path:'/en/mailusers'})
        },
        // trs(trlist){
        //     this.tr = trlist;
        // },
        add(){
             var that = this
             var cldiv = document.getElementById('mai-update')
             // var name = cldiv.getElementsByClassName('name')
             // var imap_serve = cldiv.getElementsByClassName('serve')
             var procmailrc = cldiv.getElementsByClassName('procmailrc')
             var autoresponder_enable = cldiv.getElementsByClassName('switchOnoff')
             var autoresponder_message = cldiv.getElementsByClassName('message')
             var autoresponder_subject = cldiv.getElementsByClassName('subject')
             $(".add").attr('disabled',true);
             for(var i = 0 ;i< 1;i++){
                var data = {}
                data.id = this.obj.id
                // data.name = name[i].value
                // var index = imap_serve[i].selectedIndex
                // data.imap_server = imap_serve[i].options[index].value
                data.procmailrc = procmailrc[i].value
                var switc = autoresponder_enable[i]. innerText
                switc = switc == "ON"?true:false
                data.autoresponder_enable = switc
                data.autoresponder_message = autoresponder_message[i].value
                data.autoresponder_subject = autoresponder_subject[i].value
                var data = [data]
                $.ajax({
                  url: URL + "/mailuser/update/",
                  headers:token,
                  data:JSON.stringify(data),
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
             }
        },
    },
	  components:{
       // maiswitch,
       switchs,
	  },
}
</script>

<style scoped>
   .mai-update{
     color:#3d4465;
     padding: 0 24px 10px 24px;
   }
   .mai-update>span{
     display: inline-block;
      height: 70px;
      padding-left: 32px;
      line-height: 70px;
      font-size: 20px;
   }
   #mai-update{
     background-color: #fff;
     padding: 20px 20px 20px 20px;
   }
   .mai-update input,.mai-update .option{
     display: inline-block;
     width: 100%;
     height: 40px;
     font-size: 16px;
     margin: 10px 0 25px 0;
   }
   .Subject{
     margin-top: 25px;
   }
   .textarea{
       margin: 10px 0 25px 0;
   }
   .mai-update textarea{
      width: 100%;
      font-size: 16px;
      border-color:#7680b1;
      outline:none;
      text-indent: 8px;
      resize:none;
      min-height: 80px;
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
    .xijie{
      background-color: #fff;
      padding-left:24px;
      height: 60px;
      line-height: 60px;
      font-size: 18px;
      border-bottom: 1px solid #7680b1;
    }

</style>
