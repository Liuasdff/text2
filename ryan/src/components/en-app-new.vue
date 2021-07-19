<template>
	<div class = "appnew" >
    <div class = "kong" id = "appnewxz"></div>
		<div class = "xz">
      <div class = "xzs">Pick an Application Type  &nbsp; <span class = 'erro'></span></div>

      <div>
        <div class = "xzname">PHP</div>
        <div class = "xztype">
          <span class='xzspan' @click = 'xzspanfn("WordPress",$event,types[0].typ,1)'>{{ types[0].htm }}</span>
          <span class='xzspan' @click = 'xzspanfn("PHP-FPM+Nginx",$event,types[1].typ,2)'>{{ types[1].htm }}</span>
          <span class='xzspan' @click = 'xzspanfn("PHP+Apache",$event,types[2].typ,3)'>{{ types[2].htm }}</span>
          <span class='xzspan' @click = 'xzspanfn("PHP+Apache (Symbolic Link)",$event,types[3].typ,4)'>{{ types[3].htm }}</span>
        </div>
      </div>
      <div>
        <div class = "xzname">Python</div>
        <div class = "xztype">
          <span class='xzspan' @click = 'xzspanfn("Python/uWsgi",$event,types[4].typ,5)'>{{ types[4].htm }}</span>
          <span class='xzspan' @click = 'xzspanfn("Django",$event,types[5].typ,6)'>{{ types[5].htm }}</span>
        </div>
      </div>
      <div>
        <div class = "xzname">Javascript</div>
        <div class = "xztype">
          <span class='xzspan' @click = 'xzspanfn("Node.js",$event,types[6].typ,7)'>{{ types[6].htm }}</span>
          <span class='xzspan' @click = 'xzspanfn("Ghost",$event,types[7].typ,8)'>{{ types[7].htm }}</span>
        </div>
      </div>
      <div>
        <div class = "xzname">Ruby</div>
        <div class = "xztype">
          <span class='xzspan' @click = 'xzspanfn("Ruby on Rails",$event,types[8].typ,9)'>{{ types[8].htm }}</span>
        </div>
      </div>
      <div>
        <div class = "xzname">Go</div>
        <div class = "xztype">
          <span class='xzspan' @click = 'xzspanfn("Gitea",$event,types[9].typ,10)'>{{ types[9].htm }}</span>
        </div>
      </div>
      <div>
        <div class = "xzname" >Other</div>
        <div class = "xztype" id = 'Other' >
          <span class='xzspan' @click = 'xzspanfn("Nginx Static Only",$event,types[10].typ,11)'>{{ types[10].htm }}</span>
          <span class='xzspan' @click = 'xzspanfn("Nginx Static Only (Symbolic Link)",$event,types[11].typ,12)'>{{ types[11].htm }}</span>
          <span class='xzspan' @click = 'xzspanfn("Proxy Port",$event,types[12].typ,13)'>{{ types[12].htm }}</span>
          <span class='xzspan' @click = 'xzspanfn("Subversion",$event,types[13].typ,14)'>{{ types[13].htm }}</span>
          <span class='xzspan' @click = 'xzspanfn("WebDAV",$event,types[14].typ,15)'>{{ types[14].htm }}</span>
        </div>
      </div>

      <div id = 'applications-new'>
        <div  class = 'show show1' v-show="shows == 1">
          <div class = 'show11'>Please configure the settings for your WordPress application. </div>
          <div>WordPress settings</div>
          <div>Site URL Managed </div>
          <div>
            <switchs ref='WordPress'></switchs>
          </div>
          <div>Let our control panel manage WordPress Site URL and Home URL.</div>
        </div>

        <div  class = 'show show2' v-show="shows == 2">
          <div class = 'show11'>Please select the settings for your PHP-FPM+Nginx application.</div>
          <div class = 'NPF'><span>FPM Max Child Threads</span><span>FPM Max Requests</span></div>
          <div class = 'NPF'>
            <span><input min="1" max="20" value="5" type="number"></span>
            <span><input min="1" max="25" value="20" type="number"></span>
          </div>
          <div class = 'NPF'>
            <span>The maximum number of child processes to be created. Determines the number of maximum concurrent connections.</span>
            <span>The number of requests each child process should execute before respawning. This can be useful to work around memory leaks in 3rd party libraries.</span>
          </div>
        </div>

        <div  class = 'show show4' v-show="shows == 4">
          <div class = 'show11'>Please select the settings for your PHP+Apache application.</div>
          <div>Symbolic Link Path</div>
          <div><input value="/home/"></div>
          <div>The complete file system path for the symbolic link, including trailing slash.</div>
        </div>

        <div  class = 'show show12' v-show="shows == 12">
          <div class = 'show11'>Please select the settings for your Static Only application.</div>
          <div>Symbolic Link Path</div>
          <div><input value="/home/"></div>
          <div>The complete file system path for the symbolic link, including trailing slash.</div>
        </div>

        <div  class = 'show show14' v-show="shows == 14">
          <div class = 'show11'>Please configure the settings for your Subversion application. </div>
          <div>Subversion settings</div>
          <div>Anonymous Access </div>
          <div>
            <switchs></switchs>
          </div>
          <div>Let this repo be accessed by anyone?</div>
          <div>List Parent Path </div>
          <div>
            <switchs></switchs>
          </div>
          <div>Let this repo's directory be listed?</div>
        </div>

        <div  class = 'show show15' v-show="shows == 15">
          <div class = 'show11'>Please configure the settings for your WebDAV application. </div>
          <div>WebDAV settings</div>
          <div>Anonymous Access</div>
          <div>
            <switchs></switchs>
          </div>
          <div>Let this application be accessed by anyone?</div>
        </div>



      </div>

      <div class = "name">Name &nbsp; <span class = 'nameerro'>{{ nameerro }}</span></div>
      <div class= "inp"><input v-model="name" @input="namefn" maxlength="64"></div>
      <div>Application name.</div>
      <div class= "yonghu">User</div>
      <div class= "inp">
        <span class="option" >
        	<select class = 'nppnewselect'  autocomplete="off">
        		<option :name='k.id' :webserver = 'k.server' v-for = '(k,i) in loca' value="10"> &nbsp; {{ k.name }}@{{ k.web_servers }} </option>
        	</select>
        	<div>
            <div class="optiondiv fa fa-angle-down"></div>
          </div>
        </span>
      </div>
      <div class= "anzhuang">The server and user this application is to be installed on.
         <div><a id = 'lianjie' download='' href=""></a></div>
      </div>
      <div class = "btn">
        <button class = 'add' @click="add">Add Application</button>
        <button class = 'quxiao' @click="quxiao">Cancel</button>
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
        shows:1,
        xzspan:"",
        name:'',
        typ:'',
        jso:{},
        loca:'',
        web_servers:[],
        nameerro:"Please enter a name",
        types:[
               {'htm':'WordPress','typ':'APA','auto_site_url':'','php_version':'',},
               {'htm':'PHP-FPM+Nginx','typ':'NPF','fpm_max_children':5,'fpm_max_requests':20},
               {'htm':'PHP+Apache','typ':'APA',},
               {'htm':'PHP+Apache (Symbolic Link)','typ':'SLP','sym_link_path':'',},
               {'htm':'Python/uWsgi','typ':'CUS',},
               {'htm':'Django','typ':'CUS',},
               {'htm':'Node.js','typ':'CUS',},
               {'htm':'Ghost','typ':'CUS',},
               {'htm':'Ruby on Rails','typ':'CUS',},
               {'htm':'Gitea','typ':'CUS','proxy_pass_trailing_slash':''},
               {'htm':'Nginx "Static Only"','typ':'STA',},
               {'htm':'Nginx "Static Only" (Symbolic Link)','typ':'SLS','sym_link_path':''},
               {'htm':'Proxy Port','typ':'CUS',},
               {'htm':'Subversion','typ':'SVN','svn_anon':'','svn_list_parent_path':''},
               {'htm':'WebDAV','typ':'DAV','dav_anon':''},
              ],
        a:[
          'https://raw.githubusercontent.com/opalstack/installers/master/core/wordpress/install.sh',
          '',
          '',
          '',
          'https://raw.githubusercontent.com/opalstack/installers/master/core/uwsgi/install.sh',
          'https://raw.githubusercontent.com/opalstack/installers/master/core/django/install.py',
          'https://raw.githubusercontent.com/opalstack/installers/master/core/node/install.py',
          'https://raw.githubusercontent.com/opalstack/installers/master/core/ghost/install.py',
          'https://raw.githubusercontent.com/opalstack/installers/master/core/rails/install.py',
          'https://raw.githubusercontent.com/opalstack/installers/master/core/gitea/install.py',
          '',
          '',
          '',
          'https://raw.githubusercontent.com/opalstack/installers/master/core/subversion/install.sh',
          'https://raw.githubusercontent.com/opalstack/installers/master/core/webdav/install.sh',
          'https://raw.githubusercontent.com/opalstack/installers/master/core/minio/install.sh',
          'https://raw.githubusercontent.com/opalstack/installers/master/core/adminer/install.sh',
        ],
        aa :'https://raw.githubusercontent.com/opalstack/installers/master/core/wordpress/install.sh',
			}
		},
		mounted(){
       var that = this
       $.ajax({
           url: URL + "/osuser/list/",
           headers:token,
           type: "GET",
           // data:JSON.stringify(data),
         	processData: false,
           contentType: "application/json",
         	success: function(data){
            // console.log(data.users)
            that.data = data
            $.ajax({
                url: URL + "/server/list/",
                headers:token,
                type: "GET",
                // data:JSON.stringify(data),
              	processData: false,
                contentType: "application/json",
              	success: function(data2){
                  // console.log(data2)
                  var dataa = data2.web_servers
                 that.web_servers = dataa.web_servers
                 for (var j = 0; j < that.data.length; j++) {
                   for (var jj = 0; jj < dataa.length; jj++) {
                     if (that.data[j].server == dataa[jj].id) {
                       that.data[j].web_servers = dataa[jj].hostname
                       break
                     }
                   }
                 }
                 var arrs = []
                 for(var ii = 0;ii<that.data.length;ii++){
                   if(that.data[ii].ready == true){
                     arrs.push(that.data[ii])
                   }
                 }
                 that.loca = arrs
                }
            })
           }
       })
       this.xzspanfn('WordPress','event','APA',1)
		},
		methods:{
      namefn(){
        if(this.name == ''){
          this.nameerro = 'Please enter a name'
        }else{
          this.nameerro = ''
        }
      },
      xzspanfn(text,event,typ,i){
        var that = this
       // event.target 点击到元素里面的元素则返回里面元素
       $('.xzspan').css('backgroundColor','#fff')
       $('.xzspan').eq(i-1).css('backgroundColor','#ececf1')
       this.xzspan = text
       // event.currentTarget.style.backgroundColor = '#ececf1'
       // this.xzspan = event.currentTarget.innerText
       this.typ = typ
       this.shows = i
       document.querySelector("#Other").scrollIntoView(true);
       var a = document.getElementById('lianjie')
       this.aa = that.a[i-1]
       a.setAttribute('href',this.aa)
       a.setAttribute('download',this.aa)
       a.innerHTML = this.aa
       this.$refs.WordPress.ON()
      },
      quxiao(){
        this.$router.push({path:'/en/applications'})
      },
     add(){
       var that = this
       this.jso = {}
       if(this.xzspan == ""){
          // window.location.href = '#appnewxz'
          return
       }
       if(this.name != ''){
         if(this.shows==1){
           // this.jso = {}
           var off = $(".show1 .switchOnoff").eq(0).text()
           off = off=='OFF'?false:true
           this.jso.auto_site_url = off
         }else if(this.shows==2){
           // this.jso = {}
           this.jso.fpm_max_children = parseInt($('.show2 input').eq(0).val())
           this.jso.fpm_max_requests = parseInt($('.show2 input').eq(1).val())
         }else if(this.shows==4){
           // this.jso = {}
           this.jso.sym_link_path = $('.show4 input').eq(0).val()
         }else if(this.shows==12){
           this.jso = {}
           this.jso.sym_link_path = $('.show12 input').eq(0).val()
         }else if(this.shows==14){
           // this.jso = {}
           var off1 = $(".show14 .switchOnoff").eq(0).text()
           off1 = off1=='OFF'?false:true
           var off2 = $(".show14 .switchOnoff").eq(1).text()
           off2 = off2=='OFF'?false:true
           this.jso.svn_anon = off1
           this.jso.svn_list_parent_path = off2
         }else if(this.shows==15){
           // this.jso = {}
           var off = $(".show15 .switchOnoff").eq(0).text()
           off = off=='OFF'?false:true
           this.jso.dav_anon = off
         }
        var data = {}
        data.json = this.jso
        data.name = this.name
        data.type = this.typ
        data.installer_url = this.aa
        data.server = $('.nppnewselect option:selected').attr('webserver')
        data.osuser = $('.nppnewselect option:selected').attr('name')
        console.log(data)
        var arr = []
        arr.push(data)
          $(".add").attr('disabled',true);
          $.ajax({
             url: URL + "/app/create/",
             headers:token,
             data:JSON.stringify(arr),
             // data:data,
             type: "POST",
          	  processData: false,
             contentType: "application/json",
          	  success: function(data){
                 var data = JSON.stringify(data)
                 that.$router.push({path:'/en/applications'})
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
       switchs,
		},
	}
</script>

<style scoped>
  ..appnew{
    text-align: top;
    vertical-align: top;
  }
  .kong{
    height: 60px;
  }
  .xz>div{
    background-color: #fff;
  }
  .appnew>div>div{
    padding-left:20px;
    padding-right:20px;
  }
  .appnew .xz{
    padding-bottom: 40px;
  }
  .xzs{
    height: 60px;
    line-height: 60px;
    border-bottom: 1px solid #7680b1;
  }
  .xzname{
    height: 60px;
    line-height: 60px;
    border-bottom: 1px dashed #7680b1;
  }
	.appnew .xztype{
    padding: 30px 20px;
    border-bottom: 1px solid #7680b1;
  }
  .xztype>span{
    display: inline-block;
    width: 150px;
    padding: 10px 30px;
    cursor: pointer;
    vertical-align: top;
  }
  .xztype>span:hover{
    background-color: #ececf1;
  }
  .name{
    padding-top: 40px;
  }
  .xz input,.xz .option{
    width: 100%;
    height: 40px;
    font-size: 18px;
  }
  .inp{
    padding-top: 5px;
    padding-bottom: 5px;
  }
  .yonghu{
    padding-top: 40px;
  }
  .anzhuang{
    padding-bottom: 40px;
    border-bottom: 1px solid #7680b1;
  }
  .btn{
    padding-top: 40px;
    padding-bottom: 40px;
    height: 55px;
  }
  .btn button{
    float: right;
    margin-right: 15px;
    height: 55px;
    font-size: 16px;
  }

  .nameerro,.erro{
    color: red;
  }
  .show{
    /* display: none; */
  }
  .show>div{
    padding: 10px 0;
  }
  .show11{
    height: 50px;
    line-height: 50px;
    border: 1px solid #0000FF;
    text-indent: 10px;
    font-size: 18px;
    color:#0062CC;
  }
  .NPF>span{
    display: inline-block;
    margin: 0px 10px;
    padding: 0;
    width: 250px;
    vertical-align: top;
  }
</style>
