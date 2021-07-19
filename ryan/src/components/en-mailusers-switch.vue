<template>
	<div class = "maiswitch">
    <div class = "guanbi"><button @click="delfu">Delete</button></div>
		<div>Username</div>
		<div><input class = 'name' placeholder="Please type a mailbox username"></div>
		<div>Mailbox Server</div>
		<div>
		  <span class="option" >
		  	<select class = "serve" @change="selectchange()"  autocomplete="off">
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
		<div>Autoresponder Body</div>
		<div class = "textarea"><textarea class = "message" placeholder = "Autoresponder text goes here"></textarea></div>
	</div>
</template>

<script>
  import switchs from './myComponents/switch.vue'
	export default{
		data(){
			return{
         data:[],
			}
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
    props:['index'],
		methods:{
       delfu(){
         this.$emit('chliddel',this.index)
       },
		},
		components:{
			switchs,
		},
	}
</script>

<style scoped>
    .maiswitch input,.maiswitch .option{
      display: inline-block;
      width: 100%;
      height: 40px;
      font-size: 16px;
      margin: 10px 0 25px 0;
    }
    .textarea{
        margin: 10px 0 25px 0;
    }
    .maiswitch textarea{
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

     .guanbi{
       padding-left: 20px;
       margin-bottom: 10px;
     }
     .guanbi button{
       width: 100px;
       height: 40px;
       background-color: #fd397a;
     }
     .guanbi button:hover{
       background-color: red;
     }
</style>
