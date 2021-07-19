<template>
	<div id = 'home'>
    <div class = 'fixed-left' :class = "{'csswidth':cssw == true}" @mouseenter="f2enter()" @mouseleave="f2leave()">
      <div class = 'fixed-left-top'>
        <span class = "imgdiv" :class = "{'cssdisplay':cssimg == false,'cssblue':css1 == '/en'}" >
          <router-link to = "/en">
            <img src="../../static/image/a.png">
          </router-link>
        </span>
        <span class = "fa fa-arrow-left" @click="f2left(false)" :class = "{'cssdisplay':css == false}"></span>
        <span class = "fa fa-arrow-right" @click="f2right(true)" :class = "{'cssdisplay':css == true}"></span>
      </div>
      <div class = 'fixed-lefta'>
        <div id = 'fixed-leftaa'>
          <div :class = "{'cssblue':css1=='/en/notices'}">
            <router-link to = "/en/notices">
              <i  class = "fa fa-bell-o"></i>
              <span>Notices</span>
            </router-link>
          </div>
          <div :class = "{'cssblue':css1=='/en/users'}">
            <router-link to = "/en/users">
              <i  class = "fa fa-user-circle-o"></i>
              <span><U></U>Shell Users</span>
            </router-link>
          </div>
          <div :class = "{'cssblue':css1=='/en/applications'}">
            <router-link to = "/en/applications">
              <i  class = "fa fa-cube"></i>
              <span>Applications</span>
            </router-link>
          </div>
          <div :class = "{'cssblue':css1=='/en/domains'}">
            <router-link to = "/en/domains">
              <i  class = "fa fa-id-card-o"></i>
              <span>Domains</span>
            </router-link>
          </div>
          <div :class = "{'cssblue':css1=='/en/routes'}">
            <router-link to = "/en/routes">
              <i  class = "fa fa-globe"></i>
              <span>Site Routes</span>
            </router-link>
          </div>
          <div :class = "{'cssblue':css1=='/en/certificates'}">
            <router-link to = "/en/certificates">
              <i  class = "fa fa-book"></i>
              <span>Certificates</span>
            </router-link>
          </div>
          <div :class = "{'cssblue':css1=='/en/dns'}">
            <router-link to = "/en/dns">
              <i  class = "fa fa-edit"></i>
              <span>DNS Records</span>
            </router-link>
          </div>
          <div class = "faf" @click="cssul=!cssul" :class = "{'cssblue':css1=='/aa'}">
            <a>
              <i  class = "fa fa-database"></i>
              <span>Databases</span>
              <i class = "fa fa-chevron-right fafa" :class = "{'cssul':cssul==false}"></i>
              <i class = "fa fa-chevron-down fafa"  :class = "{'cssul':cssul==true}"></i>
            </a>
          </div>
          <ul  :class = "{'cssul':cssul==true}">
            <li :class = "{'cssblue':css1=='/en/mariausers'}">
              <router-link to = "/en/mariausers">
                • &nbsp; Maria Users
              </router-link>
            </li>
            <li :class = "{'cssblue':css1=='/en/mariadbs'}">
              <router-link to = "/en/mariadbs" >
                • &nbsp; Maria DBs
              </router-link>
            </li>
            <li :class = "{'cssblue':css1=='/en/psqlusers'}">
              <router-link to = "/en/psqlusers">
                • &nbsp; Postgres Users
              </router-link>
            </li>
            <li :class = "{'cssblue':css1=='/en/psqldbs'}">
              <router-link to = "/en/psqldbs">
                • &nbsp; Postgres DBs
              </router-link>
            </li>
          </ul>
          <div class = "faf" @click="cssul2=!cssul2" :class = "{'cssblue':css1=='/aa'}">
            <a>
              <i  class = "fa fa-envelope-o"></i>
              <span>Email</span>
              <i class = "fa fa-chevron-right fafa" :class = "{'cssul2':cssul2==false}"></i>
              <i class = "fa fa-chevron-down fafa"  :class = "{'cssul2':cssul2==true}"></i>
            </a>
          </div>
          <ul :class = "{'cssul2':cssul2==true}">
            <li :class = "{'cssblue':css1=='/en/mailusers'}">
              <router-link to = "/en/mailusers">
                • &nbsp; Mail Users
              </router-link>
            </li>
            <li :class = "{'cssblue':css1=='/en/mail'}">
              <router-link to = "/en/mail">
                • &nbsp; Email Addresses
              </router-link>
            </li>
          </ul>
          <div :class = "{'cssblue':css1=='/en/tokens'}">
            <router-link to = "/en/tokens">
              <i  class = "fa fa-key"></i>
              <span>API Tokens</span>
            </router-link>
          </div>
          <div :class = "{'cssblue':css1=='/en/usage'}">
            <router-link to = "/en/usage">
              <i  class = "fa fa-wrench"></i>
              <span>Usage</span>
            </router-link>
          </div>
          <div  class = "faf" @click="cssul3=!cssul3" :class = "{'cssblue':css1=='/aa'}">
            <a>
              <i  class = "fa fa-sticky-note-o"></i>
              <span>Billing</span>
            </a>
            <i class = "fa fa-chevron-right fafa" :class = "{'cssul3':cssul3==false}"></i>
            <i class = "fa fa-chevron-down fafa"  :class = "{'cssul3':cssul3==true}"></i>
          </div>
          <ul  :class = "{'cssul':cssul3==true}">
            <li :class = "{'cssblue':css1=='/en/contacts'}">
              <router-link to = "/en/contacts">
                • &nbsp; Contacts
              </router-link>
            </li>
            <li :class = "{'cssblue':css1=='/en/cards'}">
              <router-link to = "/en/cards">
                • &nbsp; Card
              </router-link>
            </li>
            <li :class = "{'cssblue':css1=='/en/subscriptions'}">
              <router-link to = "/en/subscriptions">
                • &nbsp; Subscriptions
              </router-link>
            </li>
            <li :class = "{'cssblue':css1=='/en/upgrade'}">
              <router-link to = "/en/upgrade">
                • &nbsp; Add Server
              </router-link>
            </li>
            <li :class = "{'cssblue':css1=='/en/invoices'}">
              <router-link to = "/en/invoices">
                • &nbsp; Invoices
              </router-link>
            </li>
          </ul>

        </div>
        <div id = "fixed-lefta-line" :class = "{'cssdisplay':cssw == true}"></div>
      </div>
    </div>

		<div class = 'fixed-top'>

      <div id = 'user-visible' @mouseenter="visible">
        <span>Hi: </span>
        <span class = 'name'>{{ name }}</span>
        <!-- <span><img :src="src" ></span> -->
      </div>
      <div id = 'user-hidden' @mouseleave="none">
        <span>Hi: </span>
        <span class = 'name'>{{ name }}</span>
        <!-- <span><img :src="src" ></span> -->
        <div><span @click="out">Log Out</span></div>
        <div><span @click="uppass">Change Password</span></div>
      </div>
    </div>
    <div id = "home-body">
      <router-view id = "home-body-luyou" class = "home-body-luyou"> </router-view>
    </div>
    <changePassword @changepassfn='changepassfn' v-if='iff'></changePassword>
	</div>
</template>

<script>
  import changePassword from "./en-home-changePassword.vue"
	export default{
		data(){
			return{
        component:'defaultcom',
        css:true,
        cssimg:true,
        cssw:false,
        css1:"/",
        cssul:true,
        cssul2:true,
        cssul3:true,
        on:false,
        name:'',
        src:"#",
        iff:false,
			}
		},
		mounted(){
     // var lang = localStorage.getItem('language')
     // var path = this.$route.path
     // if(lang == 'english' && path != '/en'){
     //   this.$router.push({path:'/en'})
     // }else if(lang == 'chinese' && path != '/'){
     //   this.$router.push({path:'/'})
     // }

      var username = localStorage.getItem('username')
      this.name = username
      // localStorage.removeItem('token')
      function gundongtiao(){
        var div = document.getElementsByClassName("fixed-lefta")[0]; //主盒子 自动大小的盒子relative
        div.style.position = "relative";
        div.style.overflow = "hidden";
        var div1 = document.getElementById("fixed-leftaa");  //第二层 固定内容大小的盒子 absolute
        div1.style.position = "absolute";
        var divline = document.getElementById("fixed-lefta-line"); // 第二层 滚动条
        var bili = 1;
        var resize1 = function(){
          var div1height = div1.offsetHeight;
          var divheight = div.offsetHeight;  //主盒子的高
            if(divheight<div1height){    //主盒子的高小于固定盒子的高就添加滚动条
              bili = divheight/div1height;  //主盒子的高占固定盒子的高的比列
              var divlineheight = divheight*bili; //滚动条的高等于主盒子的高乘以比例
              divline.style.height = divlineheight + "px";
              var div1top = -div1.offsetTop;  // 固定内容盒子的top值
              var top1 =  divheight + div1top; // 计算固定内容盒子的top值加上主盒子的高
              if(top1>=div1height){                // 大于固定盒子的高就改变top值
                var top2 =  top1 - div1height;  // 计算固定内容盒子的top值加上主盒子的高减去固定内容盒子的高
                top2 = div1top - top2;  // 固定内容盒子的top值减去 超出固定盒子高的值
                var top3 = top2 * bili; // 计算滚动条的top值
                div1.style.top = -top2 + "px";
                divline.style.top = top3 + "px";
              }
              else{
                 var top2 = div1top*bili;  // 主盒子改变根据固定盒子的top值计算滚动条的top值
                 divline.style.top = top2 + "px";
              }
            }
            else{
              divline.style.height = "0px";
              divline.style.top = "0px";
              div1.style.top = "0px";
            };
        };
        resize1();
        // my.resize("r1",resize1)
        divline.onmousedown = function(){
           var top = divline.offsetTop;
           var maxtop = div.offsetHeight - divline.offsetHeight;
           var y1 = myevt.pageY();
           var mousemove = function(){
               var y2 = myevt.pageY();
               var y3 = y2-y1;
               y3 = top + y3;
               y3 = y3<0?0:y3;
               y3 = y3>maxtop?maxtop:y3;
               // y3 = -y3
               divline.style.top = y3 + "px";
               var yy = y3/bili;
               div1.style.top = -yy + "px";
           }
           my.mousemove("m1",mousemove)
           var mymouseupfn1 = function(){
             my.mousemove("m1",null);
           }
           my.mouseup("u1",mymouseupfn1)
        }

        // 去除谷歌浏览器对阻止touch事件默认行为的警告提示的兼容代码
        var passiveSupported = false;
            try {
                var options = Object.defineProperty({}, "passive", {
                    get: function() {
                        passiveSupported = true;
                    }
                });
                window.addEventListener("test", null, options);
            } catch(err) {}
            var fn = function (event) {
                // divline.style.display = "block";
                var divheight = div.offsetHeight
                var divlineheight = divline.offsetHeight
                if(divlineheight!=0 && divlineheight<divheight){
                  event = event || window.event;/*||为或语句，当IE不能识别event时候，就执行window.event 赋值*/
                  // console.log(event.detail);//火狐
                  if(event.wheelDelta > 0 || event.detail < 0){/*可通过控制台查看，第一个针对谷歌，第二个针对火狐*/
                      // console.log(event.wheelDelta);/*控制台测试代码*/
                      /*每向上滑动则图形缩短*/
                      var linetop = divline.offsetTop - 10;
                      linetop = linetop<0?0:linetop;
                      divline.style.top = linetop + "px";
                      var yy = linetop/bili;
                      div1.style.top = -yy + "px";
                  }else {
                      /*向下滑动则加长*/
                      var linetop = divline.offsetTop + 10;
                      var maxtop = divheight - divlineheight;
                      linetop = linetop>maxtop?maxtop:linetop;
                      divline.style.top = linetop + "px";
                      var yy = linetop/bili;
                      div1.style.top = -yy + "px";
                  }
                  // event.preventDefault && event.preventDefault();
                  return false;
                }
            }
            div.addEventListener("mousewheel", fn, passiveSupported ? { passive: true } : false)


        // div.onmousewheel = function (event) {
        //     // divline.style.display = "block";
        //     var divheight = div.offsetHeight
        //     var divlineheight = divline.offsetHeight
        //     if(divlineheight!=0 && divlineheight<divheight){
        //       event = event || window.event;/*||为或语句，当IE不能识别event时候，就执行window.event 赋值*/
        //       // console.log(event.detail);//火狐
        //       if(event.wheelDelta > 0 || event.detail < 0){/*可通过控制台查看，第一个针对谷歌，第二个针对火狐*/
        //           // console.log(event.wheelDelta);/*控制台测试代码*/
        //           /*每向上滑动则图形缩短*/
        //           var linetop = divline.offsetTop - 10;
        //           linetop = linetop<0?0:linetop;
        //           divline.style.top = linetop + "px";
        //           var yy = linetop/bili;
        //           div1.style.top = -yy + "px";
        //       }else {
        //           /*向下滑动则加长*/
        //           var linetop = divline.offsetTop + 10;
        //           var maxtop = divheight - divlineheight;
        //           linetop = linetop>maxtop?maxtop:linetop;
        //           divline.style.top = linetop + "px";
        //           var yy = linetop/bili;
        //           div1.style.top = -yy + "px";
        //       }
        //       event.preventDefault && event.preventDefault();
        //       return false;
        //     }
        // };
         /*为火狐绑定滚动事件*/
        function bind(obj,eventStr,callback) {
            obj.addEventListener(eventStr,callback,false);
        }
        // bind(div,"DOMMouseScroll",div.onmousewheel);
        bind(div,"DOMMouseScroll",fn);
        wachdiv.divsize(div,resize1,"home")
        wachdiv.divsize(div1,resize1,"home1")
      };
      gundongtiao();


      // my.resize("r2",resize2)
		},
    watch: { // 路由监听：监听路由的变化，从而做出相应操作
              // var that = this;
              $route: {
                  immediate: true, // 一旦监听到路由的变化立即执行
                  handler(to,from) { // 回调函数，两个参数，to：当前的组件，from：上一个组件
                  // console.log(to.path)
                  this.css1 = to.path;
                  // this.activeMenu = to.path  // 给activeMenu重新赋值为当前组件的路由地址
                  }
              }
    },
     provide() {     // provide是一个匿名函数，返回一个对象 祖路由
        return {
          opalstack: this.opalstack,
          name:this.name,
        };
      },
		methods:{
      visible(){
        document.getElementById('user-hidden').style.display = 'block'
      },
      none(){
        document.getElementById('user-hidden').style.display = 'none'
      },
      out(){
        // var username = localStorage.getItem('username')
        // var password = localStorage.getItem('password')
        // localStorage.clear()
        // localStorage.setItem('username',username)
        // localStorage.setItem('password',password)
        this.$router.push({path:'/en/login'})
      },
      uppass(){
        localStorage.setItem('home-username',localStorage.getItem('username'))
        this.iff = true
      },
      changepassfn(){
        this.iff = false
      },
      opalstack(){
        this.$router.push({path:'/'})
      },
      f2(index){
         this.cssw = index;
         // this.cssline = !index;
      },
       f2left(index){
          this.cssw = true;
          this.css = index;
          this.cssimg = false;
          this.on = true;
          // var div = document.getElementById("home-body-luyou")
          var div = document.getElementById("home-body")
          div.style.marginLeft = "50px"
          var globalsearch = document.getElementsByClassName("global-search")
          for(var i = 0;i<globalsearch.length;i++){
            globalsearch[i].style.left = "50px"
          }
          search = false
       },
       f2right(index){
         this.cssw = false;
          this.css = index;
          this.cssimg = true;
          this.on = false;
          // var div = document.getElementById("home-body-luyou")
          var div = document.getElementById("home-body")
          div.style.marginLeft = "200px"
          var globalsearch = document.getElementsByClassName("global-search")
          for(var i = 0;i<globalsearch.length;i++){
            globalsearch[i].style.left = "200px"
          }
          search = true
       },
       f2enter(){
         if(this.on){
            this.f2(false)
            this.cssimg = true
         }

         var scrollFunc=function(e){
             var e = e||window.event;
            if (e&&e.preventDefault){
                 e.preventDefault();
                 e.stopPropagation();
                 // console.log(1)
             }else{
              e.returnvalue=false;
              // console.log(2)
              // return false;
             }
         }
         scrollFunc()
       },
       f2leave(){
         if(this.on){
           this.f2(true)
           this.cssimg = false
         }
       },

		},
		components:{
        changePassword,
		},
	}
</script>

<style scoped>
 #home{
   height: 100%;
   /* min-width: 500px; */
 }
 #home .cssdisplay{
   display: none;
 }
 #home .csswidth{
   width: 50px;
 }
 #home .cssblue{
   background-color: #0062CC;
 }
 #home .cssul{
   display: none;
 }
 #home .cssul2{
   display: none;
 }
 #home .cssul3{
   display: none;
 }
 i{
   margin-left: 20px;
 }
 .faf{
   position: relative;
 }
 .fafa{
   position: absolute;
   right: 20px;
   height: 45px;
   line-height: 45px;
   /* color:red; */
 }
.fixed-left{
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  width: 200px;
  height: 100%;
  background-color: #242939;;
  overflow: hidden;
  color:#eaeaea;
  cursor:default;
  /* padding-left: 20px; */
  -webkit-user-select: none; /* 不可选择复制*/
  -moz-user-select:none;     /* 不可选择复制*/
        user-select:none;
}
.fixed-left-top {
  position: relative;
  /* padding-left: 20px; */
  width: 200px;
  height: 60px;
  font-size: 22px;
  cursor:default;
  padding-top: 20px;
}
.fixed-lefta{
  height: calc(100% - 100px);
  /* width: 200px; */
  /* max-height: 540px; */
  min-height: 150px;
  position: relative;
}
.fixed-lefta>div{
  width: 200px;
}
.fixed-lefta>div>div{
  height: 45px;
  line-height: 45px;
  cursor: pointer;
}
.fixed-lefta ul{
  /* position: relative; */
  padding:0 0 0 0px;
  margin: 0;
}
.fixed-lefta li{
  width: 165px;
  padding-left: 35px;
  height: 45px;
  line-height: 45px;
}
.fixed-lefta a:hover{
  color:#e82525;;
}
#fixed-leftaa ul a{
   width: 100%;
}
#fixed-leftaa a{
  display: inline-block;
  width: 200px;
  height: 45px;
  /* padding-left: 20px; */
}
.fixed-left-top .imgdiv{
  /* vertical-align: text-top; */
  display: inline-block;
  padding:10px 10px 7px 10px;
  cursor: pointer;
  vertical-align:middle;
  margin-right: 20px;
}
.fa-arrow-left,.fa-arrow-right{
  cursor:pointer;
  position: absolute;
  right: 20px;
  top:32px;
}
.fa-arrow-right{
  /* margin-left: 20px; */
}
.fixed-lefta i{
  margin-right: 10px;
}
#fixed-lefta-line{
  background-color: #214c77;
  width: 14px;
  height: 100%;
  border-radius: 5px;
  position: absolute;
  top: 0;
  right: 0;
}
.fixed-top{
  width: 100%;
  height: 75px;
  position: fixed;
  z-index:9;
  background-color: #fff;
  color: 0F249C#;
  top: 0;
  left: 0;
}
.fixed-top>div{
  display: inline-block;
  /* float: right; */
  position: absolute;
  right: 10px;
  padding: 25px 10px;
  cursor: pointer;
  width: 190px;
  border: 1px solid #fff;
}
.fixed-top .name{
  max-width: 100px;
  min-width: 30px;
}
#user-visible{
  z-index: 2;
  /* background-color: blue; */
}
#user-hidden{
   position: absolute;
   display: none;
   top:0;
   right: 10px;
   color:#0062CC;
   border: 1px solid #0062CC;
   background-color: #fff;
   z-index: 3;
 }
 #user-hidden>div{
   margin-top: 10px;
  }
  #user-hidden>div>span:hover{
    color: red;
  }
 #user-hidden>div>span{
   color:#0062CC;
 }
.fixed-top span{
  color:#3d4465;
  }
.fixed-top img{
  width: 40px;
  height: 40px;
  vertical-align: middle;
}
.fixed-lefta a{
  color:#eaeaea;
}
#home-body{
  /* color:#3d4465; */
  margin: 75px 0px 0 200px;
  /* background-color: #ececf1; */
  /* min-width: 500px; */
}
.home-body-luyou{
  color:#3d4465;
  background-color: #ececf1;
  min-width: 600px;
}
</style>
