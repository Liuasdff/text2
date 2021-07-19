<template>
	<div>
    <div class = 'divth'>Edit Application</div>
		<div class = 'appupdatediv'>
      <div class = 'div'>
        <div class = 'name'>{{ name }}</div>
        <div v-show="shows=='CUS'">
          <div>This application has no editable parameters.</div>
        </div>
        <div v-show="shows=='STA'">
          <div>This application has no editable parameters.</div>
        </div>
        <div class = 'SLS' v-show="shows=='SLS'">
          <div>
            <span>符号链接路径</span>
            <span><input v-model="link"></span>
          </div>
          <div>
            <span></span>
            <span>符号链接的完整文件系统路径，包括最后的斜杠。</span>
          </div>
        </div>

        <div class = 'show1 show27' v-show="shows=='APA'">
          <div>
            <span>PHP Version</span>
            <span class="option">
            	<select autocomplete="off">
            		<option value="56"> &nbsp; PHP 5.6</option>
            		<option value="73"> &nbsp; PHP 7.3</option>
            		<option value="74" selected='selected' > &nbsp; PHP 7.4</option>
                <option value="80"> &nbsp; PHP 8.0</option>
            	</select>
            	<div>
            	  <div class="optiondiv fa fa-angle-down"></div>
            	</div>
            </span>
          </div>
          <div>
            <span></span>
            <span>Sets the version of PHP used by this application.</span>
          </div>
          <div class = 'auto_site_url'>
            <span>Site URL Managed </span>
            <span><switchs ref = 'show11'></switchs></span>
          </div>
          <div class = 'auto_site_url'>
            <span></span>
            <span>Let our control panel manage WordPress Site URL and Home URL？</span>
          </div>
        </div>

        <div class = 'show2 show27' v-show="shows=='NPF'">
          <div>
            <span>FPM Max Child Threads</span>
            <span><input :value="zi" min="1" max="10" value="5" type="number"></span>
          </div>
          <div>
            <span></span>
            <span>The maximum number of child processes to be created. Determines the number of maximum concurrent connections.</span>
          </div>
          <div>
            <span>FPM Max Requests</span>
            <span><input min="1" :value="max" max="25" value="20" type="number"></span>
          </div>
          <div>
            <span></span>
            <span>The number of requests each child process should execute before respawning. This can be useful to work around memory leaks.</span>
          </div>
        </div>

        <div class = 'show3 show27' v-show="shows=='SLP'">
          <div>
            <span>PHP Version</span>
            <span class="option">
            	<select autocomplete="off">
            		<option value="56"> &nbsp; PHP 5.6</option>
            		<option value="73"> &nbsp; PHP 7.3</option>
            		<option value="74" selected='selected' > &nbsp; PHP 7.4</option>
                <option value="80"> &nbsp; PHP 8.0</option>
            	</select>
            	<div>
            	  <div class="optiondiv fa fa-angle-down"></div>
            	</div>
            </span>
          </div>
          <div>
            <span></span>
            <span>Sets the version of PHP used by this application.</span>
          </div>
          <div>
            <span>Symbolic Link Path</span>
            <span><input v-model="link"></span>
          </div>
          <div>
            <span></span>
            <span>The complete file system path for the symbolic link, including trailing slash.</span>
          </div>
        </div>

        <div class = 'show7 show27' v-show="shows=='SVN'">
          <div>
            <span>List Parent Path?</span>
            <span><switchs ref = 'show71'></switchs></span>
          </div>
          <div>
            <span></span>
            <span>List Parent Path?</span>
          </div>
          <div>
            <span>Anonymous Access</span>
            <span><switchs ref = 'show72'></switchs></span>
          </div>
          <div>
            <span></span>
            <span>Let this repo be accessed by anyone?</span>
          </div>
        </div>

        <div class = 'show8 show27' v-show="shows=='DAV'">
          <div>
            <span>Anonymous Access</span>
            <span><switchs ref = 'show81'></switchs></span>
          </div>
          <div>
            <span></span>
            <span>Let this repo be accessed by anyone?</span>
          </div>
        </div>

        <div class = "btn">
          <button class = 'add' @click="add">Save</button>
          <button class = 'quxiao' @click="quxiao">Cancel</button>
        </div>
      </div>

    </div>


    <div class = "Opalstack">©2021 Opalstack LLC</div>
	</div>
</template>

<script>
  import switchs from '@/components/myComponents/switch.vue'
	export default{
		data(){
			return{
         id:'',
         name:'',
         type:'',
         jso:{},
         shows:'',
         zi:5,
         max:20,
         link:'/home/',
			}
		},
		mounted(){
      var obj = JSON.parse(localStorage.getItem('appupdate'))
      // console.log(obj)
      this.id = obj.id
      this.name = obj.name
      this.shows = obj.type
      if(!obj.json.auto_site_url){
        $('.auto_site_url').css('display','none')
      }
      this.jso = obj.json
      if(this.jso.auto_site_url == true){
        this.$refs.show11.ON()
      }
      if(this.jso.php_version){
        $('.show1 select').val(this.jso.php_version)
        $('.show3 select').val(this.jso.php_version)
      }
      if(this.jso.svn_anon == true){
        // console.log(this.jso.svn_anon)
        this.$refs.show71.ON()
      }
      if(this.jso.svn_list_parent_path == true){
        this.$refs.show72.ON()
      }
      if(this.jso.dav_anon == true){
         this.$refs.show81.ON()
      }
      if(this.jso.fpm_max_children){
        this.zi = this.jso.fpm_max_children
      }
      if(this.jso.fpm_max_requests){
       this.max = this.jso.fpm_max_requests
      }
      if(this.jso.sym_link_path){
       this.link = this.jso.sym_link_path
      }

		},
		methods:{
      quxiao(){
        this.$router.push({path:'/en/applications'})
      },
      add(){
        var that = this
        if(this.shows == 'CUS' || this.shows == 'STA' ){
          this.jso = {}
          this.$router.push({path:'/en/applications'})
          return
        }else if(this.shows == 'APA'){
           this.jso = {}
           var switchstext1 = $('.show1 .switchOnoff').eq(0).text()
           switchstext1 = switchstext1 == 'OFF'?false:true
           this.jso.auto_site_url = switchstext1
           var select1 = $('.show1 select').val()
           this.jso.php_version = parseInt(select1)
        }else if(this.shows == 'NPF'){
          this.jso = {}
          this.jso.fpm_max_children = parseInt($('.show2 input').eq(0).val())
          this.jso.fpm_max_requests = parseInt($('.show2 input').eq(1).val())
          console.log(this.jso)
        }else if(this.shows == 'SLP'){
           this.jso = {}
           this.jso.sym_link_path = this.link
           // var switchstext1 = $('.show3 .switchOnoff').eq(0).text()
           // switchstext1 = switchstext1 == 'OFF'?false:true
           // this.jso.auto_site_url = switchstext1
           var select1 = $('.show3 select').val()
           this.jso.php_version = parseInt(select1)
        }else if(this.shows == 'SLS'){
           this.jso = {}
           this.jso.sym_link_path = this.link
        }else if(this.shows == 'SVN'){
          this.jso = {}
          var switchstext1 = $('.show7 .switchOnoff').eq(0).text()
          switchstext1 = switchstext1 == 'OFF'?false:true
          var switchstext2 = $('.show7 .switchOnoff').eq(1).text()
          switchstext2 = switchstext2 == 'OFF'?false:true
          this.jso.svn_anon = switchstext1
          this.jso.svn_list_parent_path = switchstext2
        }else if(this.shows == 'DAV'){
           this.jso = {}
           var switchstext1 = $('.show8 .switchOnoff').eq(0).text()
           switchstext1 = switchstext1 == 'OFF'?false:true
           this.jso.dav_anon = switchstext1
        }
        var data = {}
        data.id = this.id
        data['json'] = this.jso
        // console.log(data)
        var arr = [data]
        $(".add").attr('disabled',true);
        $.ajax({
           url: URL + "/app/update/",
           headers:token,
           data:JSON.stringify(arr),
           // data:data,
           type: "POST",
        	  processData: false,
           contentType: "application/json",
        	  success: function(data){
               var data = JSON.stringify(data)
               // myalert("修改成功" )
               that.$router.push({path:'/en/applications'})
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
		},
	}
</script>

<style scoped>
  .appupdatediv{
   /* display:flex; */
   /* flex-direction: column; */
   /* justify-content: center; */
   /* align-items: center; */
  }
   .divth{
     height: 60px;
     line-height:60px;
     font-size: 22px;
     text-indent: 10px;
   }
   .div{
     min-width: 500px;
     max-width: 700px;
     padding: 20px;
     background-color:#fff;
     border-radius: 8px;
   }
   .name{
     font-size: 22px;
     margin-bottom: 20px;
   }

   .show27>div{
     margin-bottom: 20px;
     font-size: 18px;
   }
   .show27>div>span:nth-child(1){
    display: inline-block;
    width: 220px;
    text-align: right;
    margin-right: 20px;
   }
   .show27>div>span:nth-child(2){
    display: inline-block;
    width: calc(100% - 250px);
   }
   .show27>div>span input{
    height: 40px;
    width: 100%;
    font-size: 18px;
   }

   .SLS>div{
     margin-bottom: 20px;
     font-size: 18px;
   }
   .SLS>div>span:nth-child(1){
    display: inline-block;
    width: 150px;
    text-align: right;
    margin-right: 20px;
   }
   .SLS>div>span:nth-child(2){
    display: inline-block;
    width: calc(100% - 180px);
   }
   .SLS>div>span input{
    height: 40px;
    width: 100%;
    font-size: 18px;
   }
</style>
