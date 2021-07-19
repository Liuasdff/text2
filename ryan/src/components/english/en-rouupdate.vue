<template>
  <div class="rounew">
    <div class="">
      <div>
        <div class="top">网站详情</div>
        <div class="div2">
          <div>
            <span><span class="sleft">姓名</span></span>
            <span><input v-model="input1" disabled="disabled" placeholder=""></span>
            <span></span>
          </div>
         <!-- <div>
            <span><span class="sleft">服务器</span></span>
            <span><input  :placeholder = "obj.servers[0].hostname" disabled="disabled"></span>
            <span class="option">
              <select v-model="select1" autocomplete="off">
                <option v-for="(k,i) in servers" :value="k.hostname"> &nbsp; {{ k.hostname }} </option>
              </select>
              <div>
                <div class="optiondiv fa fa-angle-down"></div>
              </div>
            </span>
            <span></span>
          </div> -->
          <div>
            <span><span class="sleft">服务器IP</span></span>
            <span class="option">
              <select v-model="select2" class='rounewselect2' autocomplete="off">
                <option :idd='k.id' v-for="(k,i) in ips" :value="k.id"> &nbsp; {{ k.ip }} </option>
              </select>
              <div>
                <div class="optiondiv fa fa-angle-down"></div>
              </div>
            </span>
            <span></span>
          </div>
          <div>
            <span><span class="sleft">证书</span></span>
            <span class="option">
              <select v-model="select3" id="certoption3" autocomplete="off">
                <option v-for="(k,i) in cert" :idd='k.id' :value="k.name"> &nbsp; {{ k.name }} </option>
              </select>
              <div>
                <div class="optiondiv fa fa-angle-down"></div>
              </div>
            </span>
            <span></span>
          </div>
          <div>
            <span><span class="sleft">让我们加密证书</span></span>
            <span class="swspan">
              <switchs ref='switch1' :height="'40px'" :width="'80px'"></switchs>
            </span>
            <span></span>
          </div>
          <div>
            <span><span class="sleft"></span></span>
            <span>您是否希望我们管理此站点的证书生成和颁发？可以在我们的文档中找到更多信息。</span>
            <span></span>
          </div>
          <div>
            <span><span class="sleft">重定向到HTTPS</span></span>
            <span class="swspan">
              <switchs ref='switch2' :height="'40px'" :width="'80px'"></switchs>
            </span>
            <span></span>
          </div>
          <div>
            <span><span class="sleft"></span></span>
            <span>将该站点的所有HTTP通信重定向到HTTPS？</span>
            <span></span>
          </div>
        </div>

        <div class="div3">应用程序路由信息</div>

        <div class="kelong" >
          <div class="kelongdiv" v-for='(kk,ii) in objroutes' :key = 'kk.id'>
            <div>
              <span>
                <span class="option">
                  <select class='rounewoption4' v-model="kk.app.id" autocomplete="off">
                    <option v-for="k in appdata" :idd='k.id' :value="k.id"> &nbsp; {{ k.name }}{{ k.osuser.name }}@{{ k.server.hostname }}</option>
                    <!-- <option :idd='k.id' v-for="k in appdata" :value="k.myname" :key='k.id'> &nbsp; {{ k.myname }}</option> -->
                  </select>
                  <div>
                    <div class="optiondiv fa fa-angle-down"></div>
                  </div>
                </span>
              </span>
              <span><input class='rounewinput2' v-model="kk.uri" placeholder="/"></span>
              <span class="kelongdel"><button @click="delfn4(ii)" class="delbtn">删除</button></span>
            </div>
            <div class="klbottom">
              <span>选择一个应用程序。</span>
              <span>键入将向其提供应用程序的URI端点。</span>
              <span></span>
            </div>
          </div>
        </div>

        <div>
          <div>
            <button class='addone' @click="addone"><i>十</i>添加路线</button>
          </div>
          <div class="yuxinxi">
            <span>域信息</span>
          </div>
        </div>

        <div class="klwang" >
          <div class="klwangdiv" v-for='(k,ii) in objdomains' :key='k.id'>
            <div>
              <span class="option">
                <select class='rounewoption5' v-model="k.name"  autocomplete="off">
                  <option v-for="k in doudata" :idd='k.id' :value="k.name" :key='k.id'> &nbsp; {{ k.name }} </option>
                </select>
                <div>
                  <div class="optiondiv fa fa-angle-down"></div>
                </div>
              </span>
              <span class="del klwangdel"><button @click="delfn5(ii)" class = 'delbtn'>删除</button></span>
            </div>
            <div>选择一个域。如果该域不在列表中，则它可能在另一个站点路由上。首先从另一个站点中删除域。</div>
          </div>
        </div>
        <div class="wangbtn">
          <button @click="addtow"><i>十</i>新增网域</button>
        </div>
        <!-- </div> -->

        <div class="bottombtn">
          <button class="add" @click="Save">保存</button>
        </div>

      </div>
    </div>

    <div class="Opalstack">©2021 Opalstack LLC</div>
  </div>
</template>

<script>
  import switchs from './myComponents/switch.vue'
  export default {
    data() {
      return {
        // aa:'',
        appdata: "",
        doudata: '',
        ips: [],
        servers: [],
        cert: [],
        input1: '',
        input2: '',
        select1: '',
        select2: '',
        select3: '',
        select4: '',
        select5: '',
        obj: [],
        objroutes: [],
        objdomains: [],
        add1:0,
        add2:0,
      }
    },
    mounted() {
      this.obj = JSON.parse(localStorage.getItem('rouupdate'))
      this.objroutes = this.obj.routes
      this.objdomains = this.obj.domains
      this.input1 = this.obj.name
      if(this.obj.generate_le == true){
        this.$refs.switch1.ON()
      }
      if(this.obj.redirect == true){
        this.$refs.switch2.ON()
      }
      // console.log(this.objroutes)
      var that = this
      $.ajax({
        url: URL + "/app/list/?embed=server",
        headers: token,
        type: "GET",
        // data:JSON.stringify(data),
        processData: false,
        contentType: "application/json",
        success: function(data) {
          // console.log(data)
          that.appdata = data
          // that.select4 = data[0].id
        }
      })

      $.ajax({
        url: URL + "/domain/list/",
        headers: token,
        type: "GET",
        // data:JSON.stringify(data),
        processData: false,
        contentType: "application/json",
        success: function(data) {
          // console.log(data)
          that.doudata = data
          that.select5 = data[0].name
          var data = data

          for (var i = 0; i < that.objdomains.length; i++) {
            for (var ii = 0; ii < data.length; ii++) {
              if (data[ii].id == that.objdomains[i].id) {
                that.objdomains[i].name = data[ii].name
              }
            }
          }
        }
      })

      $.ajax({
        url: URL + "/cert/list/",
        headers: token,
        type: "GET",
        // data:JSON.stringify(data),
        processData: false,
        contentType: "application/json",
        success: function(data) {
          // console.log(data)
          that.cert = data
          $.ajax({
            url: URL + "/cert/shared/",
            headers: token,
            type: "GET",
            // data:JSON.stringify(data),
            processData: false,
            contentType: "application/json",
            success: function(data) {
              // console.log(data)
              that.cert.push(data)
              for (var i = 0; i < that.cert.length; i++) {
                if(!that.obj.cert){
                  that.select3 = that.cert[0].name
                  break
                }
                else if (that.cert[i].id == that.obj.cert) {
                  that.select3 = that.cert[i].name
                }
              }
              // that.select3 = data[0].name
            }
          })
        }
      })

      $.ajax({
        url: URL + "/ip/list/",
        headers: token,
        type: "GET",
        // data:JSON.stringify(data),
        processData: false,
        contentType: "application/json",
        success: function(datab) {
          // console.log(datab)
          var aa = []
          for(var i = 0;i<datab.length;i++){
            if(datab[i].type == 4){
              aa.push(datab[i])
            }
          }
          that.ips = aa
          that.select2 = that.obj.ip.id
        }
      })
    },
    methods: {
      delfn4(i){
        this.objroutes.splice(i,1)
      },
      delfn5(i){
        this.objdomains.splice(i,1)
      },
      addone() {
        var a = {}
        a.id = this.add1 +'abcdefg'
        a.app={}
        a.app.id = this.appdata[0].id
        this.add1+=1
        this.objroutes.push(a)
      },
      addtow() {
        var a = {}
        a.id = this.add2 +'aaabbbccc'
        this.add2+=1
        a.name = this.doudata[0].name
        this.objdomains.push(a)
      },
      Save() {
        var obj = {}
        obj.id = this.obj.id
        obj.name = this.input1
        var hostname = this.select1
        for (var i = 0; i < this.servers.length; i++) {
          if (this.servers[i].hostname == hostname) {
            obj.server = this.servers[i].id
            break
          }
        }
        var select = document.getElementsByClassName('rounewselect2')[0]
        var selectindex = select.selectedIndex
        var idd = select.options[selectindex].getAttribute('idd')
        var num = this.ips[selectindex].type
        var ip = 'ip' + num
        obj[ip] = idd
        var select = document.getElementById('certoption3')
        var selectindex = select.selectedIndex
        var idd = select.options[selectindex].getAttribute('idd')
        obj.cert = idd
        obj.routes = []
        var select = document.getElementsByClassName('rounewoption4')
        var input2 = document.getElementsByClassName('rounewinput2')
        for (var i = 0; i < select.length; i++) {
          var selectindex = select[i].selectedIndex
          var idd = select[i].options[selectindex].getAttribute('idd')
          obj.routes.push({
            'app': idd,
            'uri': input2[i].value
          })
        }
        obj.domains = []
        var select = document.getElementsByClassName('rounewoption5')
        for (var i = 0; i < select.length; i++) {
          var selectindex = select[i].selectedIndex
          var idd = select[i].options[selectindex].getAttribute('idd')
          obj.domains.push(idd)
        }
        var on1 = document.getElementsByClassName('rounew')[0].getElementsByClassName('switchOnoff')[0].innerHTML
        on1 = on1 == 'ON' ? true : false
        obj.generate_le = on1
        var on2 = document.getElementsByClassName('rounew')[0].getElementsByClassName('switchOnoff')[1].innerHTML
        on2 = on2 == 'ON' ? true : false
        obj.redirect = on2
        // console.log(obj)
        var data = [obj]
        var that = this
        $(".add").attr('disabled', true);
        $.ajax({
          url: URL + "/site/update/",
          headers: token,
          data: JSON.stringify(data),
          // data:data,
          type: "POST",
          processData: false,
          contentType: "application/json",
          success: function(data) {
            var data = JSON.stringify(data)
            // alert("添加成功")
            that.$router.push({
              path: '/en/routes'
            })
          },
          error: function(xhr, status, text) {
            console.log(xhr)
            var a = ''
            var b = xhr.responseJSON
            a = JSON.stringify(b)
            myalert(a)
            $(".add").attr('disabled', false);
          },
        })

      },
    },
    components: {
      switchs,
    },
  }
</script>

<style scoped>
  .rounew>div {
    padding: 40px 24px 40px 24px;
  }

  .rounew>div>div {
    background-color: #fff;
  }

  .rounew>div>div>div {
    padding: 0 20px;
  }

  .top {
    height: 60px;
    line-height: 60px;
    padding-left: 20px;
    font-size: 18px;
    border-bottom: 1px solid #7680b1;
  }

  .div2 {
    padding-left: 20px;
    padding-right: 20px;
  }

  .div2>div {
    margin-top: 30px;
    display: flex;
  }

  .div2>div>span {
    height: 40px;
  }

  .sleft {
    float: right;
    line-height: 40px;
    padding-right: 20px;
  }

  .div2>div>span:nth-child(1),
  .div2>div>span:nth-child(3) {
    flex: 1;
  }

  .div2>div>span:nth-child(2) {
    flex: 2;
  }

  .div2 input,
  .div2 select {
    width: 100%;
    height: 40px;
  }

  .swspan {
    vertical-align: middle;
    display: inline-block;
  }

  .div3 {
    height: 100px;
    line-height: 100px;
    padding-left: 20px;
    font-size: 18px;
    border-top: 1px dashed #7680b1;
    margin-top: 20px;
  }

  .kelong {
    padding: 0 20px;
  }

  .kelongdiv>div {
    display: flex;
  }

  .kelongdiv>div>span:nth-child(1),
  .kelongdiv>div>span:nth-child(2) {
    flex: 3;
    height: 40px;
  }

  .kelongdiv>div>span:nth-child(3) {
    flex: 1;
    display: flex;
    /* 下面一行兼容IE */
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .addone{
    height: 40px;
  }
  .kelong .option {
    height: 40px;
    width: 95%;
  }

  .kelong input {
    height: 40px;
    width: 100%;
  }

  .klbottom {
    margin-top: 5px;
    height: 50px;
  }

  .kelong button {
    height: 40px;
  }

  .yuxinxi {
    height: 60px;
    line-height: 80px;
    font-size: 18px;
  }

  .klwangdiv>div:nth-child(1) {
    display: flex;
  }

  .klwangdiv {
    margin-top: 30px;
  }

  .klwangdiv .option {
    flex: 6;
    height: 40px;
    /* margin-bottom: 5px; */
  }

  .klwangdiv .del {
    flex: 1;
    /* 下面一行兼容IE */
   display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .rounew .delbtn{
    width: 90px;
    height: 42px;
    vertical-align: top;
    background-color: #fd397a;
  }
  .rounew .delbtn:hover{
    background-color: red;
  }
  .rounew .wangbtn {
    height: 60px;
    padding-top: 20px;
  }

  .rounew .bottombtn {
    padding: 20px;
    border-top: 1px solid #7680b1;
  }

  .bottombtn button {
    width: 100%;
    height: 60px;
  }

  .klbtn,
  .wangbtn button {
    height: 40px;
  }

  .kelongdel i {
    height: 40px;
    display: inline-block;
    background-color: red;
  }
</style>
