<template>
	<div>
    <div class = 'divth'>编辑申请</div>
		<div class = 'appupdatediv'>
      <div class = 'div'>
        <div class = 'name'>{{ name }}</div>     
        <div v-show="shows=='CUS'">
          <div>此应用程序没有可编辑的参数。</div>
        </div>
        <div v-show="shows=='STA'">
          <div>此应用程序没有可编辑的参数。</div>
        </div>
        <div v-show="shows=='SLS'">
          <div>此应用程序没有可编辑的参数。</div>
        </div>

        <div class = 'show1 show27' v-show="shows=='APA'">
          <div>
            <span>PHP版本</span>
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
            <span>设置此应用程序使用的PHP版本。</span>
          </div>
          <div>
            <span>网站网址受管理</span>
            <span><switchs ref = 'show11'></switchs></span>
          </div>
          <div>
            <span></span>
            <span>让我们的控制台管理WordPress网站网址和首页网址吗？</span>
          </div>
        </div>

        <div class = 'show2 show27' v-show="shows=='NPF'">
          <div>
            <span>FPM最大子线程</span>
            <span><input min="1" max="20" value="5" type="number"></span>
          </div>
          <div>
            <span></span>
            <span>要创建的最大子进程数。确定最大并发连接数。</span>
          </div>
          <div>
            <span>FPM最高要求</span>
            <span><input min="1" max="25" value="20" type="number"></span>
          </div>
          <div>
            <span></span>
            <span>每个子进程在重生之前应执行的请求数。这对于解决内存泄漏很有用。</span>
          </div>
        </div>

        <div class = 'show3 show27' v-show="shows=='SLP'">
          <div>
            <span>PHP版本</span>
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
            <span>设置此应用程序使用的PHP版本。</span>
          </div>
        </div>

        <div class = 'show7 show27' v-show="shows=='SVN'">
          <div>
            <span>列出父路径</span>
            <span><switchs ref = 'show71'></switchs></span>
          </div>
          <div>
            <span></span>
            <span>列出父路径？</span>
          </div>
          <div>
            <span>匿名访问</span>
            <span><switchs ref = 'show72'></switchs></span>
          </div>
          <div>
            <span></span>
            <span>让任何人都可以访问此仓库吗？</span>
          </div>
        </div>

        <div class = 'show8 show27' v-show="shows=='DAV'">
          <div>
            <span>匿名访问</span>
            <span><switchs ref = 'show81'></switchs></span>
          </div>
          <div>
            <span></span>
            <span>让任何人都可以访问此仓库吗？</span>
          </div>
        </div>

        <div>
          <button class = 'add' @click="btn">确定</button>
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
			}
		},
		mounted(){
      var obj = JSON.parse(localStorage.getItem('appupdate'))
      this.id = obj.id
      this.name = obj.name
      this.shows = obj.type
      this.jso = obj.jso
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

		},
		methods:{
      btn(){
        var that = this
        if(this.shows == 'CUS' || this.shows == 'STA'  || this.shows == 'SLS'){
          this.jso = {}
          this.$router.push({path:'/applications'})
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
           // var switchstext1 = $('.show3 .switchOnoff').eq(0).text()
           // switchstext1 = switchstext1 == 'OFF'?false:true
           this.jso.auto_site_url = switchstext1
           var select1 = $('.show3 select').val()
           this.jso.php_version = parseInt(select1)
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
        console.log(data)
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
             console.log(xhr)
             var a = ''
             for(var k in xhr.responseJSON){
               a = a + k + " " +xhr.responseJSON[k]
             }
             myalert(a)
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
     max-width: 600px;
     padding: 20px;
     background-color:#fff;
     border-radius: 8px;
   }
   .name{
     font-size: 22px;
     margin-bottom: 20px;
   }
   .div button{
      width: 100%;
      height: 50px;
      margin-top: 30px;
   }
   .show27>div{
     margin-bottom: 20px;
     font-size: 18px;
   }
   .show27>div>span:nth-child(1){
    display: inline-block;
    width: 150px;
    text-align: right;
    margin-right: 20px;
   }
   .show27>div>span:nth-child(2){
    display: inline-block;
    width: calc(100% - 180px);
   }
   .show27>div>span input{
    height: 40px;
    width: 100%;
    font-size: 18px;
   }
</style>
